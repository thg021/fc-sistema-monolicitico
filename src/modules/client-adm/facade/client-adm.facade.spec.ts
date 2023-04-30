import { Sequelize } from "sequelize-typescript";
import { ClientAdmModel } from "../repository/client-adm.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("ClientAdmAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientAdmModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const clientAdmFacade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "ClientAdm 1",
      email: "email",
      address: "address",
    };

    await clientAdmFacade.add(input);
    const client = await ClientAdmModel.findOne({ where: { id: input.id } });
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should check stock a client", async () => {
    const clientAdmFacade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "ClientAdm 1",
      email: "email",
      address: "address",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ClientAdmModel.create(input);
    const client = await clientAdmFacade.find({ id: input.id });

    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});
