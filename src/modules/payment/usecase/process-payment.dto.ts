export interface IProcessPaymentInputDto {
  amount: number;
  orderId: string;
}

export interface IProcessPaymentOutputDto {
  transactionId: string;
  status: string;
  amount: number;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}
