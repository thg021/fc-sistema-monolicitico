import Client from "../domain/client-adm.entity";

export default interface IClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
