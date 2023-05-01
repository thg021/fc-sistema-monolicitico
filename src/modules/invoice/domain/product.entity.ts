import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type TProductProps = {
  id?: Id;
  name: string;
  price: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
  #name: string;
  #price: number;

  constructor(props: TProductProps) {
    super(props.id);
    this.#name = props.name;
    this.#price = props.price;
  }

  get name(): string {
    return this.#name;
  }
  get price(): number {
    return this.#price;
  }
}
