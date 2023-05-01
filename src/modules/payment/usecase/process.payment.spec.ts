import { Transaction } from "../domain/transaction";
import ProcessPayment from "./process-payments.usecase";

const transaction = new Transaction({ amount: 100, orderId: "test" });
const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

describe("Process payment usecase unit test", () => {
  it("should process payment a order", async () => {
    const transactionRepository = MockRepository();
    const usecase = new ProcessPayment(transactionRepository);

    const result = await usecase.execute({ amount: 100, orderId: "test" });

    expect(result.transactionId).toEqual(expect.any(String));
    expect(result.orderId).toBe("test");
    expect(result.status).toBe("approved");
    expect(result.createdAt).toEqual(expect.any(Date));
    expect(result.updatedAt).toEqual(expect.any(Date));
  });

  it("should return 'declined' when the amount is less than 100", async () => {
    const transactionRepository = MockRepository();
    const usecase = new ProcessPayment(transactionRepository);

    const result = await usecase.execute({ amount: 99, orderId: "test" });

    expect(result.transactionId).toEqual(expect.any(String));
    expect(result.orderId).toBe("test");
    expect(result.status).toBe("declined");
    expect(result.createdAt).toEqual(expect.any(Date));
    expect(result.updatedAt).toEqual(expect.any(Date));
  });
});
