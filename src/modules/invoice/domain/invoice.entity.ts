import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

type TInvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  #name: string;
  #document: string;
  #address: Address;
  #items: Product[];

  constructor(props: TInvoiceProps) {
    super(props.id);
    this.#name = props.name;
    this.#document = props.document;
    this.#address = props.address;
    this.#items = props.items;
    this.validate();
  }

  private validate(): void {
    if (this.#items.length === 0) {
      throw new Error(
        "It is not possible to generate an invoice without items"
      );
    }
  }

  total(): number {
    return this.#items.reduce((totalProducts, product) => {
      return (totalProducts += product.price);
    }, 0);
  }

  get name(): string {
    return this.#name;
  }

  get document(): string {
    return this.#document;
  }

  get address(): Address {
    return this.#address;
  }

  get items(): Product[] {
    return this.#items;
  }
}
