import { Transaction } from "../domain/transaction";
import IPaymentGateway from "../gateway/transaction.gateway";
import { TransactionModel } from "./transaction.model";

export default class TransactionRepository implements IPaymentGateway {
  async save(input: Transaction): Promise<Transaction> {
    const transactionProps = {
      id: input.id,
      amount: input.amount,
      status: input.status,
      orderId: input.orderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await TransactionModel.create({
      id: transactionProps.id.id,
      amount: transactionProps.amount,
      status: transactionProps.status,
      orderId: transactionProps.orderId,
      createdAt: transactionProps.createdAt,
      updatedAt: transactionProps.updatedAt,
    });

    return new Transaction(transactionProps);
  }
}
