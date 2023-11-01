import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToOne as OneToOne_, JoinColumn as JoinColumn_, OneToMany as OneToMany_} from "typeorm"
import {ContractActivity} from "./contractActivity.model"
import {DecodedActivityArg} from "./decodedActivityArg.model"

@Entity_()
export class DecodedContractActivity {
  constructor(props?: Partial<DecodedContractActivity>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  name!: string

  @Index_({unique: true})
  @OneToOne_(() => ContractActivity, {nullable: false})
  @JoinColumn_()
  activity!: ContractActivity

  @OneToMany_(() => DecodedActivityArg, e => e.decodedActivity)
  args!: DecodedActivityArg[]
}
