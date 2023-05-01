import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import { Transaction } from "../domain/transaction";

describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a process payment", async () => {
    const transactionProps = {
      orderId: "order_id",
      amount: 100,
    };
    const transactionRepository = new TransactionRepository();
    const transaction = new Transaction(transactionProps);
    transaction.approve();
    const result = await transactionRepository.save(transaction);

    console.log(transaction.status);

    expect(transaction.id.id).toBe(result.id.id);
    expect(transaction.amount).toBe(result.amount);
    expect(transaction.status).toBe(result.status);
    expect(transaction.orderId).toBe(result.orderId);
  });
});
