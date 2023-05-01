import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type TransactionProps = {
  id?: Id;
  amount: number;
  orderId: string;
  status?: string;
  createdAt?: Date;
  updated?: Date;
};
export class Transaction extends BaseEntity implements AggregateRoot {
  #amount: number;
  #orderId: string;
  #status: string;

  constructor(props: TransactionProps) {
    super(props.id);
    this.#amount = props.amount;
    this.#orderId = props.orderId;
    this.#status = props.status || "pending";
    this.validate();
  }

  validate(): void {
    if (this.#amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  }

  approve() {
    this.#status = "approved";
  }

  decline() {
    this.#status = "declined";
  }

  process(): void {
    if (this.#amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }

  get amount(): number {
    return this.#amount;
  }

  get orderId(): string {
    return this.#orderId;
  }

  get status(): string {
    return this.#status;
  }
}
