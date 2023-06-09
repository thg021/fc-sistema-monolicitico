import { IPlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);
describe("PlaceOrder unit test", () => {
  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUseCase();

    it("should throw new error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params findAll
      placeOrderUsecase["catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found")
      );
    });
  });
  describe("validateProducts", () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUseCase();

    it("should throw error if no products are selected", async () => {
      const input: IPlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("No products selected"));
    });

    it("should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          })
        ),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase["productFacade"] = mockProductFacade;

      let input: IPlaceOrderInputDto = {
        clientId: "0",
        products: [{ productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));
    });
  });
  describe("Execute method", () => {
    it("should throw error when client not found.", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };
      //@ts-expect-error - no param in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["clientFacade"] = mockClientFacade;

      const input: IPlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("client not found.")
      );
    });

    it("should throw error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };
      //@ts-expect-error - no param in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["clientFacade"] = mockClientFacade;

      const input: IPlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );
    });
  });
});
