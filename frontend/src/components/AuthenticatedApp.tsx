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
  app: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: '15% 70% 15%',
    gridTemplateRows: '20% 70% 10%',
    columnGap: '10px',
    rowGap: '10px',
    justifyItems: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    boxShadow: '0px 0px 20px 0px #949494',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    padding: '15px'
  },
  leftColumn: {
    // height: '100%'
  },
  rightColumn: {
    // alignSelf: 'start',
    // height: '100%'
  },
  categoryContainer: {
    // justifySelf: 'stretch',
    margin: '2rem'
  },
  goalsContainer: {
    // justifySelf: 'stretch'
  },
  calendar: {
    // alignSelf: 'start'
  },
  dayPicker: {
    // fontSize: '1rem'
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
        <div className={classes.app}>
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
        </div>
      )}
    </>
  );
}
