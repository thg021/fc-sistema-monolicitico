import { Sequelize } from "sequelize-typescript";
import { ClientAdmModel } from "./client-adm.model";
import ClientRepository from "./client-adm.repository";
import Client from "../domain/client-adm.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository test", () => {
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

  it("should create a client", async () => {
    const clientProps = {
      id: new Id("1"),
      name: "Client 1",
      email: "email",
      address: "address",
    };
    const clientRepository = new ClientRepository();
    const client = new Client(clientProps);
    await clientRepository.add(client);

    const clientDb = await ClientAdmModel.findOne({
      where: {
        id: client.id.id,
      },
    });

    expect(clientProps.id.id).toBe(clientDb.id);
  });

  it("should find a client", async () => {
    const clientProps = {
      id: "1",
      name: "Client 1",
      email: "email",
      address: "address",
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const clientRepository = new ClientRepository();
    await ClientAdmModel.create(clientProps);

    const clientDb = await clientRepository.find(clientProps.id);
    expect(clientProps.id).toBe(clientDb.id.id);
    expect(clientProps).toMatchObject(clientDb);
  });

  it("should throw error when client not found", async () => {
    const clientRepository = new ClientRepository();
    await expect(clientRepository.find("fake")).rejects.toThrowError(
      "Client not found"
    );
  });
});
