import React, { useState, useEffect } from 'react';
import Goal from './Goal';
import GoalItem from './GoalItem';
import Category from './Category';

interface Props {
  goals: Goal[];
  currentCategory: Category;
  dispatch: any;
}

export default function GoalsList({ goals, currentCategory, dispatch }: Props) {
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);

  function filterGoals(category: Category) {
    if (goals.length > 0) {
      return goals.filter((goal) => goal.category_id === Number(category.id));
    }
    return [];
  }

  useEffect(() => {
    setFilteredGoals(filterGoals(currentCategory));
  }, [currentCategory, goals]);

  return (
    <>
      {filteredGoals.map((goal) => (
        <GoalItem goal={goal} dispatch={dispatch} />
      ))}
    </>
  );
}
