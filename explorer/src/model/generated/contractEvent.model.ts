import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_} from "typeorm"
import {DecodedContractEvent} from "./decodedContractEvent.model"

@Entity_()
export class ContractEvent {
  constructor(props?: Partial<ContractEvent>) {
    Object.assign(this, props)
  }

  /**
   * Event ID
   */
  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Column_("int4", {nullable: false})
  indexInBlock!: number

  @Column_("text", {nullable: false})
  contractAddress!: string

  @Column_("bytea", {nullable: false})
  data!: Uint8Array

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {nullable: false})
  extrinsicHash!: string

  @OneToOne_(() => DecodedContractEvent)
  decodedEvent!: DecodedContractEvent | undefined | null
}
