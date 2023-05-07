import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacade from "../../../client-adm/facade/client-adm.facade";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacade from "../../../product-adm/facade/product-adm.facade";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import IStoreCatalogFacadeInterface from "../../../store-catolog/facade/store-catalog.facade.interface";
import Product from "../../entity/product.entity";
import ICheckoutGateway from "../../gateway /checkout.gateway";
import { IPlaceOrderInputDto, IPlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase
  implements UseCaseInterface<IPlaceOrderInputDto, IPlaceOrderOutputDto>
{
  constructor(
    private clientFacade: ClientAdmFacadeInterface,
    private productFacade: ProductAdmFacadeInterface,
    private catalogFacade: IStoreCatalogFacadeInterface
  ) {}

  async execute(input: IPlaceOrderInputDto): Promise<IPlaceOrderOutputDto> {
    const client = await this.clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error("client not found.");
    }

    await this.validateProducts(input);

    return {
      id: "string",
      invoiceId: "string",
      status: "string",
      total: 0,
      products: [],
    };
  }

  private async validateProducts(input: IPlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected");
    }

    for (const p of input.products) {
      const product = await this.productFacade.checkStock({
        productId: p.productId,
      });

      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this.catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const { id, name, description, salesPrice } = product;

    const propsProduct = {
      id: new Id(id),
      name,
      description,
      salesPrice,
    };

    return new Product(propsProduct);
  }
}
