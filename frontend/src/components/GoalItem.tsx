import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Goal, { toggleComplete, deleteGoal } from './Goal';

const useStyles = makeStyles(() => ({
  goalItem: {
    width: '25em',
    padding: '15px',
    border: '1px solid #3f7cc4',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#4a90e2',
    color: 'white',
    marginBottom: '10px'
  },
  toggleButton: {
    position: 'relative',
    left: '8rem'
  }
}));

interface Props {
  goal: Goal;
  dispatch: any;
}

export default function GoalItem({ goal, dispatch }: Props) {
  const classes = useStyles();

  function handleToggle() {
    toggleComplete(goal)
      .then((res) => {
        const {
          id,
          attributes: { user_id, description, complete, category_id }
        } = res.data.data;
        const updatedGoal = new Goal(
          id,
          user_id,
          description,
          complete,
          category_id
        );
        dispatch({
          type: 'UPDATE_GOAL',
          data: { updatedGoal }
        });
        console.log('Goal updated');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete() {
    deleteGoal(goal)
      .then((res) => {
        dispatch({ type: 'DELETE_GOAL', data: { id: goal.id } });
        console.log('Goal deleted');
      })
      .catch((err) => console.log('Error deleting goal'));
  }

  return (
    <div className={`${classes.goalItem} ${goal.complete ? 'complete' : ''}`}>
      {goal.description}
      <button className={classes.toggleButton} onClick={handleToggle}>
        Toggle
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
