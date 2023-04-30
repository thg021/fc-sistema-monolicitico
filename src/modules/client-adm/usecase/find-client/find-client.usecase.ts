import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import IClientGateway from "../../gateway/client-adm.gateway";
import { IFindClientInputDto, IFindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase
  implements UseCaseInterface<IFindClientInputDto, IFindClientOutputDto>
{
  constructor(private clientRepository: IClientGateway) {}

  async execute(input: IFindClientInputDto): Promise<IFindClientOutputDto> {
    const client = await this.clientRepository.find(input.id);
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
