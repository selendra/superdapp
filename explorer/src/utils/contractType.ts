import { Contract as Erc1155Contract } from '../abi/erc1155'
import { Contract as Erc20Contract } from '../abi/erc20'
import { Contract as Erc721Contract } from '../abi/erc721'
import { ProcessorContext } from '../processor'
import { addTimeout } from '@subsquid/util-timeout';
import { contractCallTimeout } from '../chain';
import { ContractBase, Func } from '../abi/abi.support';

export type ContractType = 'ERC20' | 'ERC721' | 'ERC1155' | 'basic' | 'bare' | 'unknown';

export type TokenDetails = {
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  uri: string | null;
};

export const CONTRACT_METHODS: {
  [method: string]: string[];
} = {
  ERC20: [
    'totalSupply()',
    'balanceOf(address)',
    'allowance(address,address)',
    'transfer(address,uint256)',
    'approve(address,uint256)',
    'transferFrom(address,address,uint256)',
  ],
  ERC721: [
    'balanceOf(address)',
    'ownerOf(uint256)',
    'transferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256,bytes)',
    'approve(address,uint256)',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'getApproved(uint256)',
    'onERC721Received(address,address,uint256,bytes)',
  ],
  ERC1155: [
    'safeTransferFrom(address,address,uint256,uint256,bytes)',
    'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)',
    // todo find out why the only 1155 contract on moonbeam fails these: https://moonbeam.moonscan.io/address/0x94558a6521185681f35afa05364ca5b142e3b6bf
    // 'balanceOf(address,uint256)',
    // 'balanceOfBatch(address[],uint256[])',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'onERC1155Received(address,address,uint256,uint256,bytes)',
    'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)',
  ],
};

export function getContractErc1155(
  ctx: ProcessorContext,
  contractAddress: string,
  block: number
): Erc1155Contract {
  return new Erc1155Contract(
    { _chain: ctx._chain, block: { height: block } },
    contractAddress
  )
}

export function getContractErc20(
  ctx: ProcessorContext,
  contractAddress: string,
  block: number
): Erc20Contract {
  return new Erc20Contract(
    { _chain: ctx._chain, block: { height: block } },
    contractAddress
  )
}

export function getContractErc721(
  ctx: ProcessorContext,
  contractAddress: string,
  block: number
): Erc721Contract {
  return new Erc721Contract(
    { _chain: ctx._chain, block: { height: block } },
    contractAddress
  )
}

function clearNullBytes(rawStr: string): string {
  /**
   * We need replace null byte in string value to prevent error:
   * "QueryFailedError: invalid byte sequence for encoding \"UTF8\": 0x00\n    at PostgresQueryRunner.query ..."
   */
  return rawStr ? rawStr.replace(/\0/g, '') : rawStr;
}

function getDecoratedCallResult(rawValue: string | null): string | null {
  const decoratedValue: string | null = rawValue;

  if (!rawValue || typeof rawValue !== 'string') return null;

  const regex = new RegExp(/^\d{10}\.[\d|\w]{4}$/);

  /**
   * This test is required for contract call results
   * like this - "0006648936.1ec7" which must be saved as null
   */
  if (regex.test(rawValue)) return null;

  return decoratedValue ? clearNullBytes(decoratedValue) : decoratedValue;
}

import * as ethers from 'ethers'
export const abi = new ethers.Interface([
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)"
]);

export const functions = {
  name: new Func<[], {}, string>(
    abi, '0x06fdde03'
  ),
  symbol: new Func<[], {}, string>(
    abi, '0x95d89b41'
  ),
}

export class BasicContract extends ContractBase {
  name(): Promise<string> {
    return this.eth_call(functions.name, [])
  }

  symbol(): Promise<string> {
    return this.eth_call(functions.symbol, [])
  }
}

export class BareContract extends ContractBase {
  name(): Promise<string> {
    return this.eth_call(functions.name, [])
  }
}



export async function getTokenDetails({
  tokenId = null,
  contractAddress,
  contractStandard,
  ctx,
  block
}: {
  tokenId?: bigint | null;
  contractAddress: string;
  contractStandard: ContractType;
  ctx: ProcessorContext;
  block: number
}): Promise<TokenDetails> {
  let contractInst = null;
  switch (contractStandard) {
    case "ERC20":
      contractInst = getContractErc20(
        ctx,
        contractAddress,
        block
      );
      break;
    case 'ERC721':
      contractInst = getContractErc721(
        ctx,
        contractAddress,
        block
      );
      break;
    case 'ERC1155':
      contractInst = getContractErc1155(
        ctx,
        contractAddress,
        block
      );
      break;
    case 'basic':
      contractInst = new BasicContract(
        { _chain: ctx._chain, block: { height: block } },
        contractAddress
      )
      break;
    case 'bare':
      contractInst = new BareContract(
        { _chain: ctx._chain, block: { height: block } },
        contractAddress
      )
      break;
    default:
  }

  if (!contractInst) throw new Error('contractInst is null');

  let name: string | null = null;
  let symbol: string | null = null;
  let decimals: number | null = null;
  let uri: string | null = null;

  try {
    name =
      'name' in contractInst
        ? await addTimeout(contractInst.name(), contractCallTimeout)
        : null;
  } catch (e) {
    console.log(e);
  }
  try {
    symbol =
      'symbol' in contractInst
        ? await addTimeout(contractInst.symbol(), contractCallTimeout)
        : null;
  } catch (e) {
    console.log(e);
  }
  try {
    decimals =
      'decimals' in contractInst
        ? await addTimeout(contractInst.decimals(), contractCallTimeout)
        : null;
  } catch (e) {
    console.log(e);
  }
  try {
    if ('uri' in contractInst && tokenId) {
      uri = clearNullBytes(
        await addTimeout(contractInst.uri(tokenId), contractCallTimeout)
      );
    } else if ('tokenURI' in contractInst && tokenId) {
      uri = clearNullBytes(
        await addTimeout(contractInst.tokenURI(tokenId), contractCallTimeout)
      );
    }
  } catch (e) {
    console.log(e);
  }

  return {
    symbol: getDecoratedCallResult(symbol),
    name: getDecoratedCallResult(name),
    decimals,
    uri
  };
}