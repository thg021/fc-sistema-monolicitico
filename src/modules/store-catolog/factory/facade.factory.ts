import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoryCatalogFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const findUsecase = new FindProductUseCase(productRepository);
    const findAllUsecase = new FindAllProductsUsecase(productRepository);

    return new StoreCatalogFacade({
      findAllUsecase,
      findUsecase,
    });
  }
}
