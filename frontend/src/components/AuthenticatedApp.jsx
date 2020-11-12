import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesList from './CategoriesList';
import GoalsList from './GoalsList';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const goalsUrl = 'http://localhost:3001/api/v1/goals';
const categoriesUrl = 'http://localhost:3001/api/v1/categories';

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: '15% 25% 45% 15%',
    gridTemplateRows: '20% 10% 60% 10%',
    columnGap: '10px',
    rowGap: '10px',
    justifyItems: 'center',
    alignItems: 'center'
  },
  categoryContainer: {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    justifySelf: 'stretch'
  },
  goalsContainer: {
    gridColumn: '3 / 4',
    gridRow: '2 / 4'
  },
  calendar: {
    gridColumn: '2 / 3',
    gridRow: '3 / 4',
    alignSelf: 'start'
  }
}));

export default function AuthenticatedApp() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid')
  };

  function filterByCategory(goals) {
    return goals.filter(
      (goal) => goal.attributes.category_id === Number(currentCategory.id)
    );
  }

  function handleDayClick(day) {
    setSelectedDay(day);
  }

  useEffect(() => {
    async function fetchData() {
      console.log('FETCHING DATA ...');

      const [goalRes, categoryRes] = await Promise.all([
        fetchGoals(),
        fetchCategories()
      ]);

      setGoals(goalRes.data.data);
      setCategories(categoryRes.data.data);
      setCurrentCategory(categoryRes.data.data[0]); // Set the first category as the default
      setIsLoading(false);
    }

    async function fetchGoals() {
      return axios({
        method: 'get',
        url: `${goalsUrl}?date=${selectedDay}`,
        headers
      });
    }

    async function fetchCategories() {
      return axios({
        method: 'get',
        url: categoriesUrl,
        headers
      });
    }

    fetchData();
  }, [selectedDay]);

  useEffect(() => {
    setFilteredGoals(filterByCategory(goals));
  }, [currentCategory]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.mainContainer}>
          <div className={classes.categoryContainer}>
            <CategoriesList
              categories={categories}
              headers={headers}
              setCurrentCategory={setCurrentCategory}
            />
          </div>
          <div className={classes.calendar}>
            <DayPicker onDayClick={handleDayClick} selectedDays={selectedDay} />
          </div>
          <div className={classes.goalsContainer}>
            <GoalsList
              allGoals={goals}
              setAllGoals={setGoals}
              filteredGoals={filteredGoals}
              setFilteredGoals={setFilteredGoals}
              headers={headers}
              currentCategory={currentCategory}
            />
          </div>
        </div>
      )}
    </>
  );
}
