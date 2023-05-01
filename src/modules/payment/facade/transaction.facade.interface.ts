export interface ISaveTransactionFacadeInputDto {
  orderId: string;
  amount: number;
}

export interface ISaveTransactionFacadeOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionFacade {
  process(
    input: ISaveTransactionFacadeInputDto
  ): Promise<ISaveTransactionFacadeOutputDto>;
}
