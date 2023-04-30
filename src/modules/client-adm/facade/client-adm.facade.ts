import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  IAddClientFacadeInputDto,
  IFindClientFacadeOutputDto,
  IFindClientFacadeInputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface<IAddClientFacadeInputDto, any>;
  findUseCase: UseCaseInterface<
    IFindClientFacadeInputDto,
    IFindClientFacadeOutputDto
  >;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  #addUseCase: UseCaseInterface<IAddClientFacadeInputDto, any>;
  #findUseCase: UseCaseInterface<
    IFindClientFacadeInputDto,
    IFindClientFacadeOutputDto
  >;

  constructor(usecaseProps: UseCaseProps) {
    this.#addUseCase = usecaseProps.addUseCase;
    this.#findUseCase = usecaseProps.findUseCase;
  }

  async add(input: IAddClientFacadeInputDto): Promise<void> {
    return await this.#addUseCase.execute(input);
  }

  async find(
    input: IFindClientFacadeInputDto
  ): Promise<IFindClientFacadeOutputDto> {
    return this.#findUseCase.execute(input);
  }
}
