import axios from 'axios';

export default class Goal {
  id: number;
  userId: number;
  description: string;
  complete: boolean = false;
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

  static url = 'http://localhost:3001/api/v1/goals';

  static fetch(date?: string) {
    return date ? axios.get(`${this.url}?date=${date}`) : axios.get(this.url);
  }

  static create(description: string, category_id: number, date: string) {
    return axios.post(`${this.url}?date=${date}`, {
      goal: { description, category_id }
    });
  }

  static toggleComplete(goal: Goal) {
    return axios.patch(`${this.url}/${goal.id}`, {
      goal: { complete: !goal.complete }
    });
  }

  static delete(goal: Goal) {
    return axios.delete(`${this.url}/${goal.id}`);
  }
}
