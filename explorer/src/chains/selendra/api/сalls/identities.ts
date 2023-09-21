import { DataNotDecodableError, UnknownVersionError } from '../../../../utils'
import {
  IdentityAddSubCall,
  IdentityProvideJudgementCall,
  IdentityRenameSubCall,
  IdentitySetIdentityCall,
  IdentitySetSubsCall
} from '../../types/calls'
import { ChainContext, Call } from '../../types/support'
import { IdentityInfo } from '../../types/v9111'

export function callSetIdentity(ctx: ChainContext, call: Call): { info: IdentityInfo }{
    let e = new IdentitySetIdentityCall(ctx, call)
    if (e.isV1030) {
      return { info: {
        twitter: {
          __kind: 'None',
        },
        ...e.asV1030.info
      }
       
      }
    } else if (e.isV1032) {
      return e.asV1032
    } else if (e.isV9111) {
      return e.asV9111
    }else {
      throw new UnknownVersionError(e.constructor.name)
    }
}

export function callSetSubIdentity(ctx: ChainContext, call: Call): { subs: [Uint8Array, any][] }{
    let e = new IdentitySetSubsCall(ctx, call)
    if (e.isV1030) {
      return e.asV1030
    } else {
      throw new UnknownVersionError(e.constructor.name)
    }
}

export function callProvideJudgementIdentity(ctx: ChainContext, call: Call): {regIndex: number, target: any, judgement: any}{
    let e = new IdentityProvideJudgementCall(ctx, call)
    if (e.isV1030) {
      const data = e.asV1030
      if (data.target.__kind === 'AccountId')
        return { ...data, target: data.target.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else if (e.isV1050) {
      return e.asV1050
    } else if (e.isV2028) {
      const data = e.asV2028
      if (data.target.__kind === 'Id')
        return { ...data, target: data.target.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else if (e.isV9111) {
      const data = e.asV9111
      if (data.target.__kind === 'Id')
        return { ...data, target: data.target.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else if (e.isV9300) {
      const data = e.asV9300
      if (data.target.__kind === 'Id')
        return { ...data, target: data.target.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else {
      throw new UnknownVersionError(e.constructor.name)
    }
}

export function callAddSubIdentity(ctx: ChainContext, call: Call): { sub: Uint8Array, data: any}{
    let e = new IdentityAddSubCall(ctx, call)
    if (e.isV2015) {
      return e.asV2015
    } else if (e.isV2028) {
      const data = e.asV2028
      if (data.sub.__kind !== 'Index') return { ...data, sub: data.sub.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else if (e.isV9111) {
      const data = e.asV9111
      if (data.sub.__kind !== 'Index') return { ...data, sub: data.sub.value }
      else throw new DataNotDecodableError(e.constructor.name, data)
    } else {
      throw new UnknownVersionError(e.constructor.name)
    }
}

export function callRenameSubIdentity(
  ctx: ChainContext,
  call: Call
): { sub: Uint8Array; data: any } {
  let e = new IdentityRenameSubCall(ctx, call)
  if (e.isV2015) {
    return e.asV2015
  } else if (e.isV2028) {
    const data = e.asV2028
    if (data.sub.__kind !== 'Index') return { ...data, sub: data.sub.value }
    else throw new DataNotDecodableError(e.constructor.name, data)
  } else if (e.isV9111) {
    const data = e.asV9111
    if (data.sub.__kind !== 'Index') return { ...data, sub: data.sub.value }
    else throw new DataNotDecodableError(e.constructor.name, data)
  } else {
    throw new UnknownVersionError(e.constructor.name)
  }
}
