import axios from 'axios';
const url = 'http://localhost:3001/api/v1/goals';

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

export function fetchGoals(date?: string) {
  return date ? axios.get(`${url}?date=${date}`) : axios.get(url);
}

export function createGoal(description: string, category_id: number, date: string) {
  return axios.post(`${url}?date=${date}`, {
    goal: { description, complete: false, category_id }
  });
}

export function toggleComplete(goal: Goal) {
  return axios.patch(`${url}/${goal.id}`, {
    goal: { complete: !goal.complete }
  });
}

export function deleteGoal(goal: Goal) {
  return axios.delete(`${url}/${goal.id}`);
}
