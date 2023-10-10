import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, OneToOne as OneToOne_} from "typeorm"
import {Transfer} from "./transfer.model"
import {StakingReward} from "./stakingReward.model"
import {Identity} from "./identity.model"
import {IdentitySub} from "./identitySub.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Transfer, e => e.account)
  transfers!: Transfer[]

  @OneToMany_(() => StakingReward, e => e.account)
  rewards!: StakingReward[]

  @OneToOne_(() => Identity)
  identity!: Identity | undefined | null

  @OneToOne_(() => IdentitySub)
  sub!: IdentitySub | undefined | null
}
