import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Product Repository test", () => {
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
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    };
    const productRepository = new ProductRepository();
    const product = new Product(productProps);
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: product.id.id,
      },
    });

    expect(productProps.id.id).toBe(productDb.id);
  });

  it("should find a product", async () => {
    const productProps = {
      id: "1",
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    };
    const productRepository = new ProductRepository();
    // const product = new Product(productProps);
    // await productRepository.add(product);

    ProductModel.create({
      ...productProps,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const productDb = await productRepository.find(productProps.id);
    expect(productProps.id).toBe(productDb.id.id);
    expect(productProps).toMatchObject(productDb);
  });

  it("should throw error when product not found", async () => {
    const productRepository = new ProductRepository();
    await expect(productRepository.find("fake")).rejects.toThrowError(
      "Product not found"
    );
  });
});
