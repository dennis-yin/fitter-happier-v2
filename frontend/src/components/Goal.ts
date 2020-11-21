export default class Goal {
  id: number;
  userId: number;
  description: string;
  complete: boolean;
  category_id: number;

  constructor(
    id: number,
    user_id: number,
    description: string,
    complete: boolean,
    category_id: number
  ) {
    this.id = id;
    this.userId = user_id;
    this.description = description;
    this.complete = complete;
    this.category_id = category_id;
  }
}
