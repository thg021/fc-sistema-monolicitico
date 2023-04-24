import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("test"),
  name: "Product 1",
  description: "Description",
  salesPrice: 10,
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("Product usecase unit test", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const result = await usecase.execute({ id: "test" });

    expect(result.id).toBe("test");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description");
    expect(result.salesPrice).toBe(10);
  });

  it("should throw error when product not found", () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    jest.spyOn(productRepository, "find").mockRejectedValue(new Error("Error"));

    expect(usecase.execute({ id: "test" })).rejects.toThrow("Error");
  });
});
