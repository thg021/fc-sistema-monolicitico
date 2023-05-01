import { Sequelize } from "sequelize-typescript";

import TransactionFacadeFactory from "../factory/transaction.factory";
import { TransactionModel } from "../repository/transaction.model";

describe("ProductAdmFacade test", () => {
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

  it("should create a transaction with status approved", async () => {
    const transactionFacade = TransactionFacadeFactory.create();
    const input = {
      orderId: "order-id",
      amount: 100,
    };

    const transaction = await transactionFacade.process(input);

    expect(transaction.transactionId).toEqual(expect.any(String));
    expect(transaction.createdAt).toEqual(expect.any(Date));
    expect(transaction.updatedAt).toEqual(expect.any(Date));
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.status).toBe("approved");
  });

  it("should create a transaction with status declined", async () => {
    const transactionFacade = TransactionFacadeFactory.create();
    const input = {
      orderId: "order-id",
      amount: 99,
    };

    const transaction = await transactionFacade.process(input);

    expect(transaction.transactionId).toEqual(expect.any(String));
    expect(transaction.createdAt).toEqual(expect.any(Date));
    expect(transaction.updatedAt).toEqual(expect.any(Date));
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.status).toBe("declined");
  });

  it("should return an error when the value is less than or equal to zero", async () => {
    const transactionFacade = TransactionFacadeFactory.create();
    const input = {
      orderId: "order-id",
      amount: 0,
    };

    await expect(transactionFacade.process(input)).rejects.toThrowError(
      "Amount must be greater than 0"
    );
  });
});
