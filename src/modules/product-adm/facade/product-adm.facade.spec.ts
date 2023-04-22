import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
    };

    await productAdmFacade.addProduct(input);
    const product = await ProductModel.findOne({ where: { id: input.id } });
    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
  });

  it("should check stock a product", async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ProductModel.create(input);
    const stock = await productAdmFacade.checkStock({ productId: input.id });

    expect(stock.productId).toBe(input.id);
    expect(stock.stock).toBe(input.stock);
  });
});
