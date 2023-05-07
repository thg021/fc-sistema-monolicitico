import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  salesPrice: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
  #name: string;
  #description: string;
  #salesPrice: number;

  constructor(props: ProductProps) {
    super(props.id);
    this.#name = props.name;
    this.#description = props.description;
    this.#salesPrice = props.salesPrice;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get salesPrice(): number {
    return this.#salesPrice;
  }
}
