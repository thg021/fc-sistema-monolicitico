import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "productInvoice",
  timestamps: false,
})
export default class ItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @BelongsTo(() => InvoiceModel, { foreignKey: "invoiceId" })
  declare invoice: InvoiceModel[];

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
