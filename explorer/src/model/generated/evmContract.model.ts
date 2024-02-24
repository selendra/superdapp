import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

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

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("text", {nullable: true})
  symbol!: string | undefined | null

  @Column_("text", {nullable: false})
  extrinsicHash!: string

  @Column_("text", {nullable: false})
  account!: string

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
