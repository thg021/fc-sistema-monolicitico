import Id from "../value-object/id.value-object";

export default class BaseEntity {
  #id: Id;
  #created_at: Date;
  #updated_at: Date;

  constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
    this.#id = id || new Id();
    this.#created_at = new Date() || createdAt;
    this.#updated_at = new Date() || updatedAt;
  }

  get id(): Id {
    return this.#id;
  }

  get createdAt(): Date {
    return this.#created_at;
  }
  get updatedAt(): Date {
    return this.#updated_at;
  }
}
