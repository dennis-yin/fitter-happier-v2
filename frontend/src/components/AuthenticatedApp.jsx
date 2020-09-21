import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuthenticatedApp() {
  const goalsUrl = 'http://localhost:3001/api/v1/goals';
  const categoriesUrl = 'http://localhost:3001/api/v1/categories';
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid')
  };

  useEffect(() => {
    async function fetchData() {
      const fetchGoals = axios({
        method: 'get',
        url: goalsUrl,
        headers
      });

      const fetchCategories = axios({
        method: 'get',
        url: categoriesUrl,
        headers
      });

      const [goalRes, categoryRes] = await Promise.all([
        fetchGoals,
        fetchCategories
      ]);
      setGoals(goalRes.data.data);
      setCategories(categoryRes.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="categories-container">
        {categories.map((category) => (
          <p>{category.attributes.title}</p>
        ))}
      </div>
      <div className="goals-container">
        {goals.map((goal) => (
          <p>{`${goal.attributes.user_id} - ${goal.attributes.description}`}</p>
        ))}
      </div>
    </div>
  );
}
