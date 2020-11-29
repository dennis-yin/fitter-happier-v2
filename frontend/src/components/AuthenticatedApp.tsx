import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import reducer from '../reducers/app';
import CategoriesList from './CategoriesList';
import Goal, { fetchGoals } from './Goal';
import Category, { fetchCategories } from './Category';
import GoalsList from './GoalsList';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: '15% 25% 45% 15%',
    gridTemplateRows: '20% 70% 10%',
    columnGap: '10px',
    rowGap: '10px',
    justifyItems: 'center',
    alignItems: 'center'
  },
  leftColumn: {
    gridColumn: '2 / 3',
    gridRow: '2 / 3'
  },
  rightColumn: {
    gridColumn: '3 / 4',
    gridRow: '2 / 3'
  },
  categoryContainer: {
    justifySelf: 'stretch'
  },
  goalsContainer: {},
  calendar: {
    alignSelf: 'start'
  },
  dayPicker: {
    fontSize: '1.7rem'
  }
}));

export interface State {
  isLoading: boolean;
  categories: Category[];
  goals: Goal[];
  currentCategory?: Category;
  selectedDay: Date;
}

const initialState: State = {
  isLoading: true,
  categories: [],
  goals: [],
  selectedDay: new Date()
};

export default function AuthenticatedApp() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  ['access-token', 'client', 'uid'].forEach(
    (key) => (axios.defaults.headers.common[key] = localStorage.getItem(key))
  );

  function handleDayClick(day: Date) {
    dispatch({ type: 'SELECT_DAY', data: day });
  }

  useEffect(() => {
    Promise.all([fetchCategories(), fetchGoals(state.selectedDay)]).then(
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
    Promise.all([fetchCategories(), fetchGoals(state.selectedDay)]).then(
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
  }, [state.selectedDay]);

  return (
    <>
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.mainContainer}>
          <div className={classes.leftColumn}>
            <div className={classes.categoryContainer}>
              <CategoriesList
                categories={state.categories}
                dispatch={dispatch}
              />
            </div>
            <div className={classes.calendar}>
              <DayPicker
                className={classes.dayPicker}
                onDayClick={handleDayClick}
                selectedDays={state.selectedDay}
              />
            </div>
          </div>
          <div className={classes.rightColumn}>
            <div className={classes.goalsContainer}>
              <GoalsList
                goals={state.goals}
                currentCategory={state.currentCategory}
                dispatch={dispatch}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
