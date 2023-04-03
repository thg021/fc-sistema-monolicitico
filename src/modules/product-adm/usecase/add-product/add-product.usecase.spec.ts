import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};
describe("Add Product usecase unit test", () => {
  it("should add a new product", async () => {
    const productRepository = MockRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "test",
      description: "description test",
      purchasePrice: 100,
      stock: 10,
    };
    const result = await usecase.execute(input);
    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result).toMatchObject(input);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
