import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

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

  @Column_("text", {nullable: false})
  extrinsicHash!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  signer!: Account

  @Column_("text", {nullable: false})
  bytecode!: string

  @Column_("text", {nullable: false})
  bytecodeContext!: string

  @Column_("text", {nullable: false})
  bytecodeArguments!: string

  @Index_()
  @Column_("text", {nullable: false})
  type!: string

  @Column_("int4", {nullable: true})
  timestamp!: number | undefined | null
}
