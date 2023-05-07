type Product = {
  productId: string;
};

export interface IPlaceOrderInputDto {
  clientId: string;
  products: Product[];
}

export interface IPlaceOrderOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: Product[];
}
