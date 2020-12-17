import React, { useEffect, useReducer } from 'react';
import '../scss/AuthenticatedApp.scss';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import reducer from '../reducers/app-reducer';
import NavBar from './NavBar';
import CategoriesList from './CategoriesList';
import Goal from './Goal';
import Category from './Category';
import GoalsList from './GoalsList';
import DayPicker from 'react-day-picker';
import ProgressBar from './ProgressBar';
import NewGoalField from './NewGoalField';
import Streak from './Streak';
import PageIndex from './PageIndex';
import 'react-day-picker/lib/style.css';

const useStyles = makeStyles(() => ({
  dayPicker: {
    fontSize: '1.4rem',
  },
}));

export interface State {
  isLoading: boolean;
  categories: Category[];
  goals: Goal[];
  filteredGoals: Goal[];
  currentCategory?: Category;
  selectedDay: Date;
  page: number;
}

const initialState: State = {
  isLoading: true,
  categories: [],
  goals: [],
  filteredGoals: [],
  selectedDay: new Date(),
  page: 1,
};

export default function AuthenticatedApp() {
  const classes = useStyles();

  const [
    {
      isLoading,
      categories,
      goals,
      filteredGoals,
      currentCategory,
      selectedDay,
      page,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  ['access-token', 'client', 'uid'].forEach(
    (key) => (axios.defaults.headers.common[key] = localStorage.getItem(key))
  );

  function handleDayClick(day: Date) {
    dispatch({ type: 'SELECT_DAY', data: day });
  }

  useEffect(() => {
    Promise.all([Category.fetch(), Goal.fetch(selectedDay)]).then((res) => {
      console.log('FETCHING DATA FOR THE FIRST TIME ...');
      dispatch({
        type: 'SET_CATEGORIES',
        data: res[0].data.data,
        initialRender: true,
      });
      dispatch({ type: 'SET_GOALS', data: res[1].data.data });
      dispatch({ type: 'TOGGLE_LOADING' });
    });
  }, []);

  useEffect(() => {
    Promise.all([Category.fetch(), Goal.fetch(selectedDay)]).then((res) => {
      console.log('FETCHING DATA ...');
      dispatch({
        type: 'SET_CATEGORIES',
        data: res[0].data.data,
        initialRender: false,
      });
      dispatch({ type: 'SET_GOALS', data: res[1].data.data });
    });
  }, [selectedDay]);

  useEffect(() => {
    if (currentCategory) {
      dispatch({ type: 'FILTER_GOALS' });
    }
  }, [currentCategory, goals]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="app">
          <NavBar />
          <div className="mainContainer">
            <div className="leftColumn">
              <div className="categoryContainer">
                <CategoriesList categories={categories} dispatch={dispatch} />
              </div>
              <div className="calendar">
                <DayPicker
                  className={classes.dayPicker}
                  onDayClick={handleDayClick}
                  selectedDays={selectedDay}
                />
              </div>
            </div>
            <div className="rightColumn">
              <div className="topRight">
                <NewGoalField
                  currentCategory={currentCategory}
                  date={selectedDay}
                  dispatch={dispatch}
                />
                <Streak
                  currentCategory={currentCategory}
                  goals={filteredGoals}
                />
                <ProgressBar goals={filteredGoals} />
              </div>
              <GoalsList
                goals={filteredGoals}
                page={page}
                dispatch={dispatch}
              />
              <PageIndex dispatch={dispatch} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
