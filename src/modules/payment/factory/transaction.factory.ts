import TransactionFacade from "../facade/transaction.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payments.usecase";

export default class TransactionFacadeFactory {
  static create() {
    const transactionRepository = new TransactionRepository();
    const saveTransactionUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );
    return new TransactionFacade({
      saveUseCase: saveTransactionUseCase,
    });
  }
}
