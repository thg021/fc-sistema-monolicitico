import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ItemModel from "./item.model";

export default class InvoiceRepository implements IInvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {
        id,
      },
      include: ["items"],
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoice.id),
      document: invoice.document,
      name: invoice.name,
      address: new Address({
        city: invoice.city,
        complement: invoice.complement,
        number: invoice.number,
        state: invoice.state,
        street: invoice.street,
        zipCode: invoice.zipCode,
      }),
      items: invoice.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });
  }
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        document: invoice.document,
        name: invoice.name,
        city: invoice.address.city,
        complement: invoice.address.complement,
        number: invoice.address.number,
        state: invoice.address.state,
        street: invoice.address.street,
        zipCode: invoice.address.zipCode,

        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [{ model: ItemModel }] }
    );
  }
}
