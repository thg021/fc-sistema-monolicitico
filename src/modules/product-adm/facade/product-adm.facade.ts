import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface<AddProductFacadeInputDto, any>;
  stockUseCase: UseCaseInterface<
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
  >;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  #addUseCase: UseCaseInterface<AddProductFacadeInputDto, any>;
  #checkStockUseCase: UseCaseInterface<
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
  >;

  constructor(usecaseProps: UseCaseProps) {
    this.#addUseCase = usecaseProps.addUseCase;
    this.#checkStockUseCase = usecaseProps.stockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return await this.#addUseCase.execute(input);
  }

  async checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this.#checkStockUseCase.execute(input);
  }
}
