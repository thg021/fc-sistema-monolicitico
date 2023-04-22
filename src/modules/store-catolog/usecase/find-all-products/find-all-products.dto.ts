export interface IProduct {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface IProducts {
  products: IProduct[];
}
