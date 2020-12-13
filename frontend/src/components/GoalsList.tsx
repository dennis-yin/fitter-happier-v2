import React from 'react';
import './GoalsList.scss';
import Goal from './Goal';
import GoalItem from './GoalItem';

interface Props {
  goals: Goal[];
  dispatch: any;
}

export default function GoalsList({ goals, dispatch }: Props) {
  return (
    <>
      {goals.length === 0 ? (
        <div className="message emptyListMessage">
          You haven't made any goals for this day... yet!
        </div>
      ) : (
        goals.map((goal) => <GoalItem goal={goal} dispatch={dispatch} />)
      )}
    </>
  );
}
