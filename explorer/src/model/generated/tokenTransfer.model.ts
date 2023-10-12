import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Extrinsic} from "./extrinsic.model"
import {Account} from "./account.model"
import {TransferType} from "./_transferType"

@Entity_()
export class TokenTransfer {
  constructor(props?: Partial<TokenTransfer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  from!: Account

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  to!: Account

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("varchar", {length: 7, nullable: false})
  type!: TransferType

  @Column_("bool", {nullable: false})
  success!: boolean
}
