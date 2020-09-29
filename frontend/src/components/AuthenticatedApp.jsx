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
  
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid')
  };

  function filterGoals(goals) {
    return goals.filter(
      (goal) => goal.attributes.category_id === Number(currentCategory.id)
    );
  }

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
      setCurrentCategory(categoryRes.data.data[0]); // Set the first category as the default
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredGoals(filterGoals(goals));
  }, [currentCategory, ...goals]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="main-container">
          <div className={classes.categoryContainer}>
            <CategoriesList
              categories={categories}
              headers={headers}
              setCurrentCategory={setCurrentCategory}
            />
          </div>
          <div className="goals-container">
            <GoalsList
              allGoals={goals}
              setAllGoals={setGoals}
              filteredGoals={filteredGoals}
              headers={headers}
              currentCategory={currentCategory}
            />
          </div>
        </div>
      )}
    </>
  );
}
