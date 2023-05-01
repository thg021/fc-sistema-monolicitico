import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

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

const invoice = new Invoice({
  ...invoiceProps,
  address: new Address(invoiceProps.address),
  items: invoiceProps.items.map(
    (item) => new Product({ ...item, id: new Id(item.id) })
  ),
});

const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn(),
  };
};

describe("Invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUsecase(invoiceRepository);

    const result = await usecase.execute(invoiceProps);

    const expected = {
      id: expect.any(String),
      name: "invoice",
      document: "document",
      address: {
        street: "street",
        number: "number",
        complement: "complement",
        city: "city",
        state: "state",
        zipCode: "zipCode",
      },
      items: [
        { id: "product-1", name: "product-1", price: 10 },
        { id: "product-2", name: "product-2", price: 20 },
      ],
      total: 30,
    };

    expect(result).toMatchObject(expected);
  });

  it("should throw error when product not found", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUsecase(invoiceRepository);

    jest
      .spyOn(invoiceRepository, "generate")
      .mockRejectedValue(new Error("Error"));

    await expect(usecase.execute(invoiceProps)).rejects.toThrow("Error");
  });
});
