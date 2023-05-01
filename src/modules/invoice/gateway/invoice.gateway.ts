import Invoice from "../domain/invoice.entity";

export interface IInvoiceGateway {
  find(id: string): Promise<Invoice>;
  generate(invoice: Invoice): Promise<void>;
}
