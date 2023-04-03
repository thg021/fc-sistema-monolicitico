import { v4 as uuid } from "uuid";
import ValueObject from "./value-object.interface";

export default class Id implements ValueObject {
  #id: string;

  constructor(id?: string) {
    this.#id = id || uuid();
  }

  get id() {
    return this.#id;
  }
}
