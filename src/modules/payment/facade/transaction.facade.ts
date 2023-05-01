import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  ISaveTransactionFacadeInputDto,
  ISaveTransactionFacadeOutputDto,
  ITransactionFacade,
} from "./transaction.facade.interface";

export interface UseCaseProps {
  saveUseCase: UseCaseInterface<
    ISaveTransactionFacadeInputDto,
    ISaveTransactionFacadeOutputDto
  >;
}

export default class TransactionFacade implements ITransactionFacade {
  #saveUseCase: UseCaseInterface<
    ISaveTransactionFacadeInputDto,
    ISaveTransactionFacadeOutputDto
  >;

  constructor(useCaseProps: UseCaseProps) {
    this.#saveUseCase = useCaseProps.saveUseCase;
  }

  async process(
    input: ISaveTransactionFacadeInputDto
  ): Promise<ISaveTransactionFacadeOutputDto> {
    return await this.#saveUseCase.execute(input);
  }
}
