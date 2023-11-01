import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToOne as OneToOne_} from "typeorm"
import {ActivityType} from "./_activityType"
import {Account} from "./account.model"
import {DecodedContractActivity} from "./decodedContractActivity.model"

@Entity_()
export class ContractActivity {
  constructor(props?: Partial<ContractActivity>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("varchar", {length: 17, nullable: false})
  type!: ActivityType

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  to!: Account | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  from!: Account | undefined | null

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("jsonb", {nullable: true})
  args!: unknown | undefined | null

  @Column_("text", {nullable: false})
  extrinsicHash!: string

  @OneToOne_(() => DecodedContractActivity)
  decodedActivity!: DecodedContractActivity | undefined | null
}
