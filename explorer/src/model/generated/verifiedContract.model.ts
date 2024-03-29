import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {EvmContract} from "./evmContract.model"

@Index_(["contract", "type"], {unique: true})
@Index_(["contract", "id"], {unique: true})
@Entity_()
export class VerifiedContract {
  constructor(props?: Partial<VerifiedContract>) {
    Object.assign(this, props)
  }

  /**
   * Address
   */
  @PrimaryColumn_()
  id!: string

  @ManyToOne_(() => EvmContract, {nullable: true})
  contract!: EvmContract

  @Index_()
  @Column_("text", {nullable: false})
  name!: string

  @Index_()
  @Column_("text", {nullable: true})
  filename!: string | undefined | null

  @Column_("jsonb", {nullable: false})
  source!: unknown

  @Column_("bool", {nullable: false})
  optimization!: boolean

  @Column_("text", {nullable: false})
  compilerVersion!: string

  @Column_("jsonb", {nullable: false})
  compiledData!: unknown

  @Column_("jsonb", {nullable: false})
  args!: unknown

  @Column_("int4", {nullable: false})
  runs!: number

  @Column_("text", {nullable: false})
  target!: string

  @Index_()
  @Column_("text", {nullable: false})
  type!: string

  @Column_("jsonb", {nullable: true})
  contractData!: unknown | undefined | null

  @Column_("text", {nullable: true})
  license!: string | undefined | null

  @Index_()
  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null
}
