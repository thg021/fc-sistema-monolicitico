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
