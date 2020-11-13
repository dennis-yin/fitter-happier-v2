import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesList from './CategoriesList';
import Goal from './Goal';
import Category from './Category';
import Headers from './Headers';
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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<any>();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const headers = new Headers(
    localStorage.getItem('access-token'),
    localStorage.getItem('client'),
    localStorage.getItem('uid')
  );

  function filterByCategory(goals: Goal[]) {
    if (goals.length > 0) {
      return goals.filter(
        (goal) => goal.category_id === Number(currentCategory.id)
      );
    }
    return [];
  }

  function handleDayClick(day: any) {
    setSelectedDay(day);
  }

  useEffect(() => {
    async function fetchGoals() {
      return axios({
        method: 'get',
        url: `${goalsUrl}?date=${selectedDay}`,
        headers: headers.formatted
      });
    }

    async function fetchCategories() {
      return axios({
        method: 'get',
        url: categoriesUrl,
        headers: headers.formatted
      });
    }

    async function fetchData() {
      console.log('FETCHING DATA ...');
      const [goalRes, categoryRes] = await Promise.all([
        fetchGoals(),
        fetchCategories()
      ]);

      setGoals(
        goalRes.data.data.map(
          (goal: any) =>
            new Goal(
              goal.id,
              goal.attributes.user_id,
              goal.attributes.description,
              goal.attributes.complete,
              goal.attributes.category_id
            )
        )
      );

      setCategories(
        categoryRes.data.data.map(
          (category: any) =>
            new Category(category.id, category.attributes.title)
        )
      );
    }

    fetchData();
  }, [selectedDay]);

  useEffect(() => {
    setFilteredGoals(filterByCategory(goals));
  }, [currentCategory]);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories[0]); // Set the first category as the default
      setIsLoading(false);
    }
  }, [goals, categories]);

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
              setCategories={setCategories}
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
