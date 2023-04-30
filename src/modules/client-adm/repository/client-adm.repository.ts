import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client-adm.entity";
import IClientGateway from "../gateway/client-adm.gateway";
import { ClientAdmModel } from "./client-adm.model";

export default class ClientRepository implements IClientGateway {
  async add(client: Client): Promise<void> {
    await ClientAdmModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
  async find(id: string): Promise<Client> {
    const client = await ClientAdmModel.findOne({
      where: {
        id,
      },
    });

    if (!client) throw new Error("Client not found");

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
