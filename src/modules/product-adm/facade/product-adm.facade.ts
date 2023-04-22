import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  #addUseCase: UseCaseInterface;
  #checkStockUseCase: UseCaseInterface;

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
