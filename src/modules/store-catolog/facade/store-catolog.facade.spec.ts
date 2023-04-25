import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import StoryCatalogFacadeFactory from "../factory/facade.factory";

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

  it("should find a product", async () => {
    const productAdmFacade = StoryCatalogFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    };

    await ProductModel.create(input);

    await productAdmFacade.find(input);
    const product = await ProductModel.findOne({ where: { id: input.id } });
    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
  });

  it("should find all products", async () => {
    const productAdmFacade = StoryCatalogFacadeFactory.create();
    const product1 = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    };
    const product2 = {
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 10,
    };

    await ProductModel.create(product1);
    await ProductModel.create(product2);

    const { products } = await productAdmFacade.findAll();
    expect(products.length).toBe(2);
    expect(products[0].id).toBe(product1.id);
    expect(products[0].name).toBe(product1.name);
    expect(products[0].description).toBe(product1.description);
    expect(products[0].salesPrice).toBe(product1.salesPrice);

    expect(products[1].id).toBe(product2.id);
    expect(products[1].name).toBe(product2.name);
    expect(products[1].description).toBe(product2.description);
    expect(products[1].salesPrice).toBe(product2.salesPrice);
  });
});
