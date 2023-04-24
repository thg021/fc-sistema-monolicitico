import { IProductGateway } from "../../gateway/product.gateway";
import { IProductInputDto, IProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase {
  #productRepository: IProductGateway;

  constructor(productRepository: IProductGateway) {
    this.#productRepository = productRepository;
  }

  async execute(input: IProductInputDto): Promise<IProductOutputDto> {
    const { id } = input;

    const product = await this.#productRepository.find(id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
