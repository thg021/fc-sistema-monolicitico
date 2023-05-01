import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import IInvoiceFacadeFacadeInterface, {
  IFindInvoiceFacadeInputDto,
  IFindInvoiceFacadeOutputDto,
  IGenerateInvoiceInputDto,
  IGenerateInvoiceOutputDto,
} from "./invoice.facade.interface";

export interface IUseCaseProps {
  findUsecase: UseCaseInterface<
    IFindInvoiceFacadeInputDto,
    IFindInvoiceFacadeOutputDto
  >;
  generateUsecase: UseCaseInterface<
    IGenerateInvoiceInputDto,
    IGenerateInvoiceOutputDto
  >;
}

export default class InvoiceFacade implements IInvoiceFacadeFacadeInterface {
  #findUsecase: UseCaseInterface<
    IFindInvoiceFacadeInputDto,
    IFindInvoiceFacadeOutputDto
  >;
  #generateUsecase: UseCaseInterface<
    IGenerateInvoiceInputDto,
    IGenerateInvoiceOutputDto
  >;

  constructor(usecaseProps: IUseCaseProps) {
    this.#findUsecase = usecaseProps.findUsecase;
    this.#generateUsecase = usecaseProps.generateUsecase;
  }

  async find(
    id: IFindInvoiceFacadeInputDto
  ): Promise<IFindInvoiceFacadeOutputDto> {
    return await this.#findUsecase.execute(id);
  }
  async generate(
    input: IGenerateInvoiceInputDto
  ): Promise<IGenerateInvoiceOutputDto> {
    return await this.#generateUsecase.execute(input);
  }
}
