import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const url = 'http://localhost:3001/api/v1/categories';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios({
          method: 'get',
          url: url,
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid')
          }
        });
        setCategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="main-container">
      {categories.map((category) => (
        <p>{category.attributes.title}</p>
      ))}
    </div>
  );
}
