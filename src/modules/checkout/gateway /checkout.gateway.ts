import Order from "../entity/order.entity";

export default interface ICheckoutGateway {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order | null>;
}
