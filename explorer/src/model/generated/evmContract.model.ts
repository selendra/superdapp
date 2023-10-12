import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Extrinsic} from "./extrinsic.model"
import {Account} from "./account.model"
import {VerifiedContract} from "./verifiedContract.model"

@Index_(["extrinsic", "id"], {unique: true})
@Entity_()
export class EvmContract {
  constructor(props?: Partial<EvmContract>) {
    Object.assign(this, props)
  }

  /**
   * Address
   */
  @PrimaryColumn_()
  id!: string

  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  signer!: Account

  @Column_("text", {nullable: false})
  bytecode!: string

  @Column_("text", {nullable: false})
  bytecodeContext!: string

  @Column_("text", {nullable: false})
  bytecodeArguments!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  gasLimit!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  storageLimit!: bigint

  @OneToMany_(() => VerifiedContract, e => e.contract)
  verifiedContract!: VerifiedContract[]

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date
}
