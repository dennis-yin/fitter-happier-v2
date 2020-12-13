import axios from 'axios';

export default class Category {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  static url = 'http://localhost:3001/api/v1/categories';

  static fetch() {
    return axios.get(this.url);
  }

  static create(title: string) {
    return axios.post(this.url, { category: { title } });
  }

  static fetchStreak(categoryId: number) {
    return axios.get(`${this.url}/${categoryId}/streaks`);
  }
}
