import AggregateRoot from "../../@shared/domain/entity/aggregate-root-interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
};

export default class Order extends BaseEntity implements AggregateRoot {
  #client: Client;
  #products: Product[];
  #status: string;

  constructor({ client, products, id, status = "pending" }: OrderProps) {
    super(id);
    this.#client = client;
    this.#products = products;
    this.#status = status;
  }

  get client(): Client {
    return this.#client;
  }

  get products(): Product[] {
    return this.#products;
  }

  get status(): string {
    return this.#status;
  }

  approve() {
    this.#status = "approved";
  }

  total(): number {
    return this.#products.reduce((totalProducts, product) => {
      return (totalProducts += product.salesPrice);
    }, 0);
  }
}
