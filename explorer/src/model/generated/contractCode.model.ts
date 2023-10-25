import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Account} from "./account.model"
import {Contract} from "./contract.model"

@Entity_()
export class ContractCode {
  constructor(props?: Partial<ContractCode>) {
    Object.assign(this, props)
  }

  /**
   * Code Hash
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  owner!: Account

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {nullable: false})
  createdExtrinsicHash!: string

  @Column_("timestamp with time zone", {nullable: true})
  removedAt!: Date | undefined | null

  @Column_("text", {nullable: true})
  removedExtrinsicHash!: string | undefined | null

  @OneToMany_(() => Contract, e => e.contractCode)
  contractsDeployed!: Contract[]
}
