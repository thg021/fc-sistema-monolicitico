import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id(),
  name: "product 1",
  description: "description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id(),
  name: "Product 2",
  description: "description",
  salesPrice: 50,
});

const mockProductRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
    find: jest.fn(),
  };
};

describe("FindAllProducts unit test", () => {
  it("should find all products", async () => {
    const productRepository = mockProductRepository();
    const usecase = new FindAllProductsUsecase(productRepository);

    const result = await usecase.execute();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].description).toBe(product1.description);
    expect(result.products[0].salesPrice).toBe(product1.salesPrice);

    expect(result.products[1].id).toBe(product2.id.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].description).toBe(product2.description);
    expect(result.products[1].salesPrice).toBe(product2.salesPrice);
  });
});
