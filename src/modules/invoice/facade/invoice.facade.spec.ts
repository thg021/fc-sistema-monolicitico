import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import ItemModel from "../repository/item.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";

const product1 = {
  id: "product-1",
  name: "product-1",
  price: 10,
};

const product2 = {
  id: "product-2",
  name: "product-2",
  price: 20,
};

const invoiceProps = {
  id: "product-1",
  name: "invoice",
  document: "document",
  address: {
    city: "city",
    complement: "complement",
    number: "number",
    state: "state",
    street: "street",
    zipCode: "zipCode",
  },
  items: [product1, product2],
};

describe("storeCatalog test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    await InvoiceModel.create(
      {
        ...invoiceProps,
        ...invoiceProps.address,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [{ model: ItemModel }] }
    );

    const invoice = await invoiceFacade.find({ id: "product-1" });
    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(invoiceProps.id);
    expect(invoice.name).toBe(invoiceProps.name);
  });

  it("should generate a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const invoice = await invoiceFacade.generate(invoiceProps);
    expect(invoice).toBeDefined();
    expect(invoice.id).toEqual(expect.any(String));
    expect(invoice.name).toBe(invoiceProps.name);
    expect(invoice.document).toBe(invoiceProps.document);
    expect(invoice.total).toBe(30);
    expect(invoice.address).toMatchObject(invoiceProps.address);
    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0]).toMatchObject(product1);
    expect(invoice.items[1]).toMatchObject(product2);
  });
});
