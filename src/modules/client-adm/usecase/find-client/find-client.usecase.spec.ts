import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client-adm.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("test"),
  name: "Client 1",
  email: "email",
  address: "address",
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe("Client usecase unit test", () => {
  it("should find a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new FindClientUseCase(clientRepository);

    const result = await usecase.execute({ id: "test" });

    expect(result.id).toBe("test");
    expect(result.name).toBe("Client 1");
    expect(result.email).toBe("email");
    expect(result.address).toBe("address");
    expect(result.createdAt).toEqual(expect.any(Date));
    expect(result.updatedAt).toEqual(expect.any(Date));
  });

  it("should throw error when client not found", () => {
    const productRepository = MockRepository();
    const usecase = new FindClientUseCase(productRepository);

    jest.spyOn(productRepository, "find").mockRejectedValue(new Error("Error"));

    expect(usecase.execute({ id: "test" })).rejects.toThrow("Error");
  });
});
