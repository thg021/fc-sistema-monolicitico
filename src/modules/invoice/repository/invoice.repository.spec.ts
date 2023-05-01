import { Sequelize } from "sequelize-typescript";
import Product from "../domain/product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ItemModel from "./item.model";

const product1 = new Product({
  id: new Id("1"),
  name: "Invoice 1 item 1",
  price: 10,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Invoice 2 item 2",
  price: 20,
});

const props = {
  id: new Id("1"),
  name: "Invoice 1",
  document: "Invoice 1 document",
  address: new Address({
    street: "Invoice 1 Street",
    number: "10",
    complement: "Invoice 1 complement",
    zipCode: "Invoice 1 zipCode",
    state: "Invoice 1 state",
    city: "Invoice 1 city",
  }),
  items: [product1, product2],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ItemModel, InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoice = new Invoice(props);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: "items",
    });

    expect(invoiceDb.id).toBe("1");
    expect(invoiceDb.name).toBe("Invoice 1");
    expect(invoiceDb.document).toBe("Invoice 1 document");
    expect(invoiceDb.street).toBe("Invoice 1 Street");
    expect(invoiceDb.number).toBe("10");
    expect(invoiceDb.complement).toBe("Invoice 1 complement");
    expect(invoiceDb.zipCode).toBe("Invoice 1 zipCode");
    expect(invoiceDb.state).toBe("Invoice 1 state");
    expect(invoiceDb.city).toBe("Invoice 1 city");
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.items[0].id).toBe("1");
    expect(invoiceDb.items[0].name).toBe("Invoice 1 item 1");
    expect(invoiceDb.items[0].price).toBe(10);
    expect(invoiceDb.items[1].id).toBe("2");
    expect(invoiceDb.items[1].name).toBe("Invoice 2 item 2");
    expect(invoiceDb.items[1].price).toBe(20);
  });

  it("should find an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const invoice = new Invoice(props);

    await invoiceRepository.generate(invoice);

    const invoiceDb = await invoiceRepository.find(invoice.id.id);

    expect(invoiceDb.id.id).toBe("1");
    expect(invoiceDb.name).toBe("Invoice 1");
    expect(invoiceDb.document).toBe("Invoice 1 document");
    expect(invoiceDb.address.street).toBe("Invoice 1 Street");
    expect(invoiceDb.address.number).toBe("10");
    expect(invoiceDb.address.complement).toBe("Invoice 1 complement");
    expect(invoiceDb.address.zipCode).toBe("Invoice 1 zipCode");
    expect(invoiceDb.address.state).toBe("Invoice 1 state");
    expect(invoiceDb.address.city).toBe("Invoice 1 city");
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.items[0].id.id).toBe("1");
    expect(invoiceDb.items[0].name).toBe("Invoice 1 item 1");
    expect(invoiceDb.items[0].price).toBe(10);
    expect(invoiceDb.items[1].id.id).toBe("2");
    expect(invoiceDb.items[1].name).toBe("Invoice 2 item 2");
    expect(invoiceDb.items[1].price).toBe(20);
  });
});
