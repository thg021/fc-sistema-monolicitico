import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe("Add Client usecase unit test", () => {
  it("should add a new client adm", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      name: "client",
      email: "client@mail.com",
      address: "Address",
    };

    const result = await usecase.execute(input);
    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
    expect(result).toMatchObject(input);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
