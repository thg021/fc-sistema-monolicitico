import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

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

  describe("findAll method", () => {
    it("should return empty array when no find product available", async () => {
      const productRepository = new ProductRepository();
      const productDb = await productRepository.findAll();

      expect(productDb.length).toBe(0);
    });
    it("should find all a product", async () => {
      const productProps = {
        id: "1",
        name: "Product 1",
        description: "Description",
        salesPrice: 100,
      };
      const productProps2 = {
        id: "2",
        name: "Product 2",
        description: "Description",
        salesPrice: 10,
      };
      const productRepository = new ProductRepository();
      // const product = new Product(productProps);
      // await productRepository.add(product);

      ProductModel.create(productProps);
      ProductModel.create(productProps2);

      const productDb = await productRepository.findAll();
      expect(productDb.length).toBe(2);
      expect(productDb[0].id.id).toBe(productProps.id);
      expect(productDb[0].name).toBe(productProps.name);
      expect(productDb[0].description).toBe(productProps.description);
      expect(productDb[0].salesPrice).toBe(productProps.salesPrice);

      expect(productDb[1].id.id).toBe(productProps2.id);
      expect(productDb[1].name).toBe(productProps2.name);
      expect(productDb[1].description).toBe(productProps2.description);
      expect(productDb[1].salesPrice).toBe(productProps2.salesPrice);
    });
  });

  describe("find Method", () => {
    it("should return erro when product not found", async () => {
      const productRepository = new ProductRepository();

      await expect(productRepository.find("false")).rejects.toThrow(
        "Product not found"
      );
    });

    it("should return a product", async () => {
      const productProps = {
        id: "1",
        name: "Product 1",
        description: "Description",
        salesPrice: 100,
      };
      const productProps2 = {
        id: "2",
        name: "Product 2",
        description: "Description",
        salesPrice: 10,
      };
      const productRepository = new ProductRepository();
      // const product = new Product(productProps);
      // await productRepository.add(product);

      ProductModel.create(productProps);
      ProductModel.create(productProps2);

      const product = await productRepository.find("1");

      expect(product.id.id).toBe(productProps.id);
      expect(product.name).toBe(productProps.name);
      expect(product.description).toBe(productProps.description);
      expect(product.salesPrice).toBe(productProps.salesPrice);
    });
  });
});
