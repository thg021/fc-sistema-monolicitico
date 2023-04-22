import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { IProductGateway } from "../../gateway/product.gateway";
import { IProducts } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {
  #productRepository: IProductGateway;

  constructor(productRepository: IProductGateway) {
    this.#productRepository = productRepository;
  }
  async execute(): Promise<IProducts> {
    const products = await this.#productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
