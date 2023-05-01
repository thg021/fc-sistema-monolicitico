import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const product1 = new Product({
  id: new Id("product-1"),
  name: "product-1",
  price: 10,
});

const product2 = new Product({
  id: new Id("product-2"),
  name: "product-2",
  price: 20,
});

const invoice = new Invoice({
  id: new Id("invoice-id"),
  name: "invoice",
  document: "document",
  address: new Address({
    city: "city",
    complement: "complement",
    number: "number",
    state: "state",
    street: "street",
    zipCode: "zipCode",
  }),
  items: [product1, product2],
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUsecase(invoiceRepository);

    const result = await usecase.execute({ id: "invoice-id" });

    const expected = {
      id: "invoice-id",
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
    expect(result.createdAt).toEqual(expect.any(Date));
  });

  it("should throw error when product not found", () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUsecase(invoiceRepository);

    jest.spyOn(invoiceRepository, "find").mockRejectedValue(new Error("Error"));

    expect(usecase.execute({ id: "test" })).rejects.toThrow("Error");
  });
});
