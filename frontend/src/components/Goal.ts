import axios from 'axios';
const goalsUrl = 'http://localhost:3001/api/v1/goals';

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
  return date ? axios.get(`${goalsUrl}?date=${date}`) : axios.get(goalsUrl);
}

export function createGoal(description: String, category_id: number) {
  return axios.post(goalsUrl, {
    goal: { description, complete: false, category_id }
  });
}

export function toggleComplete(id: number, isComplete: boolean) {
  return axios.patch(`${goalsUrl}/${id}`, {
    goal: { complete: !isComplete }
  });
}

export function deleteGoal(id: number) {
  return axios.delete(`${goalsUrl}/${id}`);
}
