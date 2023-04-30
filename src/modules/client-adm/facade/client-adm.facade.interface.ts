export interface IAddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface IFindClientFacadeInputDto {
  id: string;
}

export interface IFindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: IAddClientFacadeInputDto): Promise<void>;
  find(input: IFindClientFacadeInputDto): Promise<IFindClientFacadeOutputDto>;
}
