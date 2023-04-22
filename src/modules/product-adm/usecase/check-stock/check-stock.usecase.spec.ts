import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
    //find: jest.fn().mockReturnValue(Promise.resolve(product))
  };
};

const product = new Product({
  id: new Id("test"),
  name: "Product 1",
  description: "Description",
  purchasePrice: 10,
  stock: 10,
});

describe("CheckStock usecase unit test", () => {
  it("should check stock a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);
    jest
      .spyOn(productRepository, "find")
      .mockResolvedValue(Promise.resolve(product));

    const result = await usecase.execute({ productId: "test" });

    expect(result.productId).toBe("test");
    expect(result.stock).toBe(10);
  });

  it("should throw error when product not found", () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);

    jest.spyOn(productRepository, "find").mockRejectedValue(new Error("Error"));

    expect(usecase.execute({ productId: "test" })).rejects.toThrow("Error");
  });
});
