import { ResolvedContractsCallCall } from "../../../../interfaces/normalised";
import { ContractsCallCall } from "../../types/calls";
import { MultiAddress, Weight } from "../../types/v10000";
import { encodeAddress } from '../../../../utils'

export class NormalisedContractsCallCall extends ContractsCallCall {
  resolve(): ResolvedContractsCallCall {
    if (this.isV10000) {
      const { dest, value, gasLimit, storageDepositLimit, data } = this.asV10000 as {
        dest: MultiAddress,
        value: bigint;
        gasLimit: Weight;
        storageDepositLimit: bigint | undefined;
        data: Uint8Array;
      };
      // TODO: Ensure proper support of MultiAddress
      if (dest.__kind === "Index") {
        throw new Error("Multi-address of type Index is not supported!");
      }
      return {
        contractAddress: encodeAddress(dest.value),
        value,
        gasLimit,
        storageDepositLimit,
        data,
      };
    }
   
    throw new Error("No Runtime version found");
  }
}