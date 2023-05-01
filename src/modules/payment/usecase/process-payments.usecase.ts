import { Transaction } from "../domain/transaction";
import IPaymentGateway from "../gateway/transaction.gateway";
import {
  IProcessPaymentInputDto,
  IProcessPaymentOutputDto,
} from "./process-payment.dto";

export default class ProcessPaymentUseCase {
  #transactionRepository: IPaymentGateway;
  constructor(transactionRepository: IPaymentGateway) {
    this.#transactionRepository = transactionRepository;
  }

  async execute(
    input: IProcessPaymentInputDto
  ): Promise<IProcessPaymentOutputDto> {
    const transaction = new Transaction(input);

    transaction.process();

    const persistTransaction = await this.#transactionRepository.save(
      transaction
    );

    return {
      transactionId: persistTransaction.id.id,
      status: transaction.status,
      amount: persistTransaction.amount,
      orderId: persistTransaction.orderId,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}
