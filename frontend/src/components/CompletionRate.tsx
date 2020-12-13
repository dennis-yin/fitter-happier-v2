import React, { useState, useEffect } from 'react';
import './CompletionRate.scss';
import Goal from './Goal';

interface Props {
  goals: Goal[];
}

export default function CompletionRate({ goals }: Props) {
  const [completionRate, setCompletionRate] = useState<number>(0);

  function calculateCompletionRate() {
    if (goals.length === 0) return 0; // So we don't divide by 0
    const completed = goals.filter((goal) => goal.complete).length;
    return Math.round((completed / goals.length) * 100);
  }

  useEffect(() => {
    setCompletionRate(calculateCompletionRate());
  }, [goals]);

  return <div className="completionRate">{completionRate}%</div>;
}
