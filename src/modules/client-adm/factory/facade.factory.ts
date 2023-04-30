import StoreCatalogFacade from "../facade/client-adm.facade";
import ClientAdmRepository from "../repository/client-adm.repository";
import AddClientAdmUsecase from "../usecase/add-client/add-client.usecase";
import FindClientAdmUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientAdmRepository();
    const findUseCase = new FindClientAdmUseCase(clientRepository);
    const addUseCase = new AddClientAdmUsecase(clientRepository);

    return new StoreCatalogFacade({
      addUseCase,
      findUseCase,
    });
  }
}
