type IStoreCatalog = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export interface IFindStoreCatalogInputDto {
  id: string;
}

export interface IFindStoreCatalogOutputDto extends IStoreCatalog {}

export interface IFindAllStoreCatalogOutputDto {
  products: IStoreCatalog[];
}

export default interface IStoreCatalogFacadeInterface {
  find(id: IFindStoreCatalogInputDto): Promise<IFindStoreCatalogOutputDto>;
  findAll(): Promise<IFindAllStoreCatalogOutputDto>;
}
