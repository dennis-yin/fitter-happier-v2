import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Goal from './Goal';
import Category from './Category';

const useStyles = makeStyles(() => ({
  completionRate: {
    position: 'relative',
    right: 'auto',
    top: '1.7rem'
  }
}));

interface Props {
  goals: Goal[];
  currentCategory: Category;
}

export default function CompletionRate({ goals, currentCategory }: Props) {
  const classes = useStyles();

  const [completionRate, setCompletionRate] = useState<number>(0);

  function calculateCompletionRate() {
    if (goals.length === 0) return 0; // So we don't divide by 0

    const completed = goals.filter((goal) => goal.complete).length;

    return Math.round((completed / goals.length) * 100);
  }

  useEffect(() => {
    setCompletionRate(calculateCompletionRate());
  }, [goals, currentCategory]);

  return <div className={classes.completionRate}>{completionRate}%</div>;
}
