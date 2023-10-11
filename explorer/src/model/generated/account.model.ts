import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, OneToOne as OneToOne_} from "typeorm"
import * as marshal from "./marshal"
import {EvmContract} from "./evmContract.model"
import {StakingReward} from "./stakingReward.model"
import {Identity} from "./identity.model"
import {IdentitySub} from "./identitySub.model"

@Index_(["freeBalance", "id"], {unique: true})
@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Native address
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  evmAddress!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  freeBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lockedBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  availableBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  reservedBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  vestedBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  votingBalance!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  updatedAt!: bigint

  @OneToMany_(() => EvmContract, e => e.signer)
  evmContracts!: EvmContract[]

  @OneToMany_(() => StakingReward, e => e.account)
  rewards!: StakingReward[]

  @OneToOne_(() => Identity)
  identity!: Identity | undefined | null

  @OneToOne_(() => IdentitySub)
  sub!: IdentitySub | undefined | null
}
