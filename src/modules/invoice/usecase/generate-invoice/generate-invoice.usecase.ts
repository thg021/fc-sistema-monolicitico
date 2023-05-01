import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import { IInvoiceGateway } from "../../gateway/invoice.gateway";
import {
  IGenerateInvoiceUseCaseInputDto,
  IGenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase {
  #invoiceRepository: IInvoiceGateway;
  constructor(invoiceRepository: IInvoiceGateway) {
    this.#invoiceRepository = invoiceRepository;
  }
  async execute(
    input: IGenerateInvoiceUseCaseInputDto
  ): Promise<IGenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({ ...input.address }),
      items: input.items?.map(
        (item) =>
          new Product({
            ...item,
            id: new Id(item.id),
          })
      ),
    });

    await this.#invoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total(),
    };
  }
}
