import ValueObject from "./value-object.interface";

type IAdressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export default class Address implements ValueObject {
  #street: string;
  #number: string;
  #complement: string;
  #city: string;
  #state: string;
  #zipCode: string;

  constructor(props: IAdressProps) {
    this.#street = props.street;
    this.#complement = props.complement;
    this.#city = props.city;
    this.#state = props.state;
    this.#zipCode = props.zipCode;
    this.#number = props.number;
  }

  get street(): string {
    return this.#street;
  }
  get complement(): string {
    return this.#complement;
  }
  get city(): string {
    return this.#city;
  }
  get state(): string {
    return this.#state;
  }
  get zipCode(): string {
    return this.#zipCode;
  }
  get number(): string {
    return this.#number;
  }
}
