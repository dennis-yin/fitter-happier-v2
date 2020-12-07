import React, { useEffect, useReducer } from 'react';
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
import 'react-day-picker/lib/style.css';

const useStyles = makeStyles(() => ({
  app: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: '1.5fr 7fr 1.5fr',
    gridTemplateRows: '2fr 7fr 1fr',
    justifyItems: 'center',
    alignItems: 'center'
  },
  mainContainer: {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    boxShadow: '0px 0px 20px 0px #949494',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '15px',
    height: '100%'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    paddingTop: '2.8rem'
  },
  topRight: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  categoryContainer: {
    // justifySelf: 'stretch',
    margin: '2rem'
  },
  calendar: {
    // alignSelf: 'start'
  },
  dayPicker: {
    fontSize: '1.5vw'
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
          <NavBar />
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
              <div className={classes.topRight}>
                <NewGoalField
                  currentCategory={state.currentCategory}
                  dispatch={dispatch}
                />
                <CompletionRate
                  goals={state.goals}
                  currentCategory={state.currentCategory}
                />
              </div>
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
