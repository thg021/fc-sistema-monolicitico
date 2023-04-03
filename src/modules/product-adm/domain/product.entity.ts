import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Product extends BaseEntity implements AggregateRoot {
  #name: string;
  #description: string;
  #purchasePrice: number;
  #stock: number;

  constructor(props: ProductProps) {
    super(props.id);
    this.#name = props.name;
    this.#description = props.description;
    this.#purchasePrice = props.purchasePrice;
    this.#stock = props.stock;
  }

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get description(): string {
    return this.#description;
  }

  set description(description: string) {
    this.#description = description;
  }

  get purchasePrice(): number {
    return this.#purchasePrice;
  }

  set purchasePrice(purchasePrice: number) {
    this.#purchasePrice = purchasePrice;
  }

  get stock(): number {
    return this.#stock;
  }

  set stock(stock: number) {
    this.#stock = stock;
  }
}
