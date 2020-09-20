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
        headers: headers
      });

      const fetchCategories = axios({
        method: 'get',
        url: categoriesUrl,
        headers: headers
      })
      
      const [goalRes, categoryRes] = await Promise.all([fetchGoals, fetchCategories])
      setGoals(goalRes.data.data);
      setCategories(categoryRes.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="main-container">
      {/* {categories.map((category) => (
        <p>{category.attributes.title}</p>
      ))} */}
    </div>
  );
}
