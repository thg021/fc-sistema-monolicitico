import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import IClientGateway from "../../gateway/client-adm.gateway";
import Client from "../../domain/client-adm.entity";
import { IAddClientInputDto, IAddClientOutputDto } from "./add-client.dto";

export default class AddClientUseCase
  implements UseCaseInterface<IAddClientInputDto, IAddClientOutputDto>
{
  constructor(private clientRepository: IClientGateway) {}

  async execute(input: IAddClientInputDto): Promise<IAddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
