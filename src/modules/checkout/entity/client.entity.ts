import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: Address;
};

export default class Client extends BaseEntity implements AggregateRoot {
  #name: string;
  #email: string;
  #address: Address;

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

  get address(): Address {
    return this.#address;
  }
}
