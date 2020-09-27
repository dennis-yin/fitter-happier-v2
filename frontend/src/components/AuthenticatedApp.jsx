import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesList from './CategoriesList';
import GoalsList from './GoalsList';

const goalsUrl = 'http://localhost:3001/api/v1/goals';
const categoriesUrl = 'http://localhost:3001/api/v1/categories';

const useStyles = makeStyles(() => ({
  categoryContainer: {
    width: '20em'
  }
}));

export default function AuthenticatedApp() {
  const classes = useStyles();
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState();
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
      <div className={classes.categoryContainer}>
        <CategoriesList
          categories={categories}
          headers={headers}
          setCurrentCategoryTitle={setCurrentCategoryTitle}
        />
      </div>
      <div className="goals-container">
        <GoalsList
          goals={goals}
          headers={headers}
          currentCategoryTitle={currentCategoryTitle}
        />
      </div>
    </div>
  );
}
