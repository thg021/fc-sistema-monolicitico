import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import Id from "../../@shared/domain/value-object/id.value-object";

interface ClientProps {
  id: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
  #name: string;
  #email: string;
  #address: string;

  constructor(props: ClientProps) {
    super(props.id);
    this.#name = props.name;
    this.#email = props.email;
    this.#address = props.address;
  }

  get name(): string {
    return this.#name;
  }

  get email(): string {
    return this.#email;
  }

  get address(): string {
    return this.#address;
  }
}
