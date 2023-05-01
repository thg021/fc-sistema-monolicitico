export interface IFindInvoiceUseCaseInputDTO {
  id: string;
}

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

export interface IFindInvoiceUseCaseOutputDTO {
  id: string;
  name: string;
  document: string;
  address: TAddress;
  items: TItem[];
  total: number;
  createdAt: Date;
}
