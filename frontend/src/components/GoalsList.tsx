import React, { useState, useEffect } from 'react';
import Goal from './Goal';
import GoalItem from './GoalItem';

interface Props {
  goals: Goal[];
  dispatch: any;
}

export default function GoalsList({ goals, dispatch }: Props) {
  return (
    <>
      {goals.map((goal) => (
        <GoalItem goal={goal} dispatch={dispatch} />
      ))}
    </>
  );
}
