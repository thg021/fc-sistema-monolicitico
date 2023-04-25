import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import {
  CheckStockInputDto,
  CheckStockOutputDto,
} from "./check-stock.usecase.dto";

export default class CheckStockUseCase
  implements UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>
{
  #productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this.#productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const { productId } = input;

    const product = await this.#productRepository.find(productId);

    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
