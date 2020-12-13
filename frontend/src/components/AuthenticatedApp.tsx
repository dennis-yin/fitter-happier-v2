import React, { useEffect, useReducer } from 'react';
import './AuthenticatedApp.scss';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import reducer from '../reducers/app';
import NavBar from './NavBar';
import CategoriesList from './CategoriesList';
import Goal, { fetchGoals } from './Goal';
import Category, { fetchCategories } from './Category';
import GoalsList from './GoalsList';
import DayPicker from 'react-day-picker';
import CompletionRate from './CompletionRate';
import NewGoalField from './NewGoalField';
import Streak from './Streak';
import 'react-day-picker/lib/style.css';

const useStyles = makeStyles(() => ({
  dayPicker: {
    fontSize: '1.5vw'
  }
}));

export interface State {
  isLoading: boolean;
  categories: Category[];
  goals: Goal[];
  filteredGoals: Goal[];
  currentCategory?: Category;
  selectedDay: Date;
}

const initialState: State = {
  isLoading: true,
  categories: [],
  goals: [],
  filteredGoals: [],
  selectedDay: new Date()
};

export default function AuthenticatedApp() {
  const classes = useStyles();
  
  const [
    { isLoading, categories, goals, filteredGoals, currentCategory, selectedDay },
    dispatch
  ] = useReducer(reducer, initialState);

  ['access-token', 'client', 'uid'].forEach(
    (key) => (axios.defaults.headers.common[key] = localStorage.getItem(key))
  );

  function handleDayClick(day: Date) {
    dispatch({ type: 'SELECT_DAY', data: day });
  }

  useEffect(() => {
    Promise.all([fetchCategories(), fetchGoals(selectedDay)]).then(
      (res) => {
        console.log('FETCHING DATA FOR THE FIRST TIME ...');
        dispatch({
          type: 'SET_CATEGORIES',
          data: res[0].data.data,
          initialRender: true
        });
        dispatch({ type: 'SET_GOALS', data: res[1].data.data });
        dispatch({ type: 'TOGGLE_LOADING' });
      }
    );
  }, []);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchGoals(selectedDay)]).then(
      (res) => {
        console.log('FETCHING DATA ...');
        dispatch({
          type: 'SET_CATEGORIES',
          data: res[0].data.data,
          initialRender: false
        });
        dispatch({ type: 'SET_GOALS', data: res[1].data.data });
      }
    );
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
                <CategoriesList
                  categories={categories}
                  dispatch={dispatch}
                />
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
                <CompletionRate goals={filteredGoals} />
              </div>
              <GoalsList goals={filteredGoals} dispatch={dispatch} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
