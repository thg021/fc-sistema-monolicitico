type TItem = {
  id: string;
  name: string;
  price: number;
};

type TAddress = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export type IInvoiceFacade = {
  id: string;
  name: string;
  document: string;
  address: TAddress;
  items: TItem[];
  total: number;
};

export interface IFindInvoiceFacadeInputDto {
  id: string;
}

export interface IFindInvoiceFacadeOutputDto extends IInvoiceFacade {}

export interface IGenerateInvoiceInputDto
  extends Omit<IInvoiceFacade, "id" | "total"> {}

export interface IGenerateInvoiceOutputDto extends IInvoiceFacade {}

export default interface IInvoiceFacadeFacadeInterface {
  find(id: IFindInvoiceFacadeInputDto): Promise<IFindInvoiceFacadeOutputDto>;
  generate(input: IGenerateInvoiceInputDto): Promise<IGenerateInvoiceOutputDto>;
}
