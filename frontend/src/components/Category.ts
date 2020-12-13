import axios from 'axios';

const url = 'http://localhost:3001/api/v1/categories';

export default class Category {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

export function fetchCategories() {
  return axios.get(url);
}

export function createCategory(title: string) {
  return axios.post(url, { category: { title } });
}

export function fetchStreak(categoryId: number) {
  return axios.get(`${url}/${categoryId}/streaks`)
}
