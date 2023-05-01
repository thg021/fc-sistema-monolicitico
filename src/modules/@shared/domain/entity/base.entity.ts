import Id from "../value-object/id.value-object";

export default class BaseEntity {
  #id: Id;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
    this.#id = id || new Id();
    this.#createdAt = new Date() || createdAt;
    this.#updatedAt = new Date() || updatedAt;
  }

  get id(): Id {
    return this.#id;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }
  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
