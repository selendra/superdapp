import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Balance} from "./_balance"
import {Contract} from "./contract.model"
import {ContractCode} from "./contractCode.model"
import {Transfer} from "./transfer.model"
import {StakingReward} from "./stakingReward.model"
import {Identity} from "./identity.model"
import {IdentitySub} from "./identitySub.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new Balance(undefined, obj)}, nullable: true})
  balance!: Balance | undefined | null

  @OneToOne_(() => Contract)
  contract!: Contract | undefined | null

  @OneToMany_(() => Contract, e => e.deployer)
  contractsDeployed!: Contract[]

  @OneToMany_(() => ContractCode, e => e.owner)
  codesOwned!: ContractCode[]

  @OneToMany_(() => Transfer, e => e.account)
  transfers!: Transfer[]

  @OneToMany_(() => StakingReward, e => e.account)
  rewards!: StakingReward[]

  @OneToOne_(() => Identity)
  identity!: Identity | undefined | null

  @OneToOne_(() => IdentitySub)
  sub!: IdentitySub | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {array: true, nullable: true})
  tags!: (string)[] | undefined | null
}
