import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import IStoreCatalogFacadeInterface, {
  IFindAllStoreCatalogOutputDto,
  IFindStoreCatalogInputDto,
  IFindStoreCatalogOutputDto,
} from "./store-catalog.facade.interface";

export interface IUseCaseProps {
  findUsecase: UseCaseInterface<
    IFindStoreCatalogInputDto,
    IFindStoreCatalogOutputDto
  >;
  findAllUsecase: UseCaseInterface<void, IFindAllStoreCatalogOutputDto>;
}

export default class StoreCatalogFacade
  implements IStoreCatalogFacadeInterface
{
  #findUsecase: UseCaseInterface<
    IFindStoreCatalogInputDto,
    IFindStoreCatalogOutputDto
  >;
  #findAllUsecase: UseCaseInterface<void, IFindAllStoreCatalogOutputDto>;

  constructor(usecaseProps: IUseCaseProps) {
    this.#findUsecase = usecaseProps.findUsecase;
    this.#findAllUsecase = usecaseProps.findAllUsecase;
  }

  async find(
    id: IFindStoreCatalogInputDto
  ): Promise<IFindStoreCatalogOutputDto> {
    return await this.#findUsecase.execute(id);
  }
  async findAll(): Promise<IFindAllStoreCatalogOutputDto> {
    return await this.#findAllUsecase.execute();
  }
}
