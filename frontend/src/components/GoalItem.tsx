import React from 'react';
import './GoalItem.scss'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';
import Goal from './Goal';

interface Props {
  goal: Goal;
  dispatch: any;
}

export default function GoalItem({ goal, dispatch }: Props) {
  function handleToggle() {
    Goal.toggleComplete(goal)
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
    Goal.delete(goal)
      .then((res) => {
        dispatch({ type: 'DELETE_GOAL', data: { id: goal.id } });
        console.log('Goal deleted');
      })
      .catch((err) => console.log('Error deleting goal'));
  }

  return (
    <div className={`goalItem ${goal.complete ? 'complete' : ''}`}>
      {goal.description}
      <div className={'controls'}>
        <IoIosCheckmarkCircle
          className={'toggleButton'}
          onClick={handleToggle}
        />
        <IoIosCloseCircle
          className={'deleteButton'}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
