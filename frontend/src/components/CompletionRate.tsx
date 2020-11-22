import React, { useState, useEffect } from 'react';
import Goal from './Goal';

interface Props {
  completedGoals: number[];
  goals: Goal[];
}

function CompletionRate({ completedGoals, goals }: Props) {
  const [completionRate, setCompletionRate] = useState<number>(0);

  function calculateCompletionRate(numCompleted: number, numGoals: number) {
    if (numGoals === 0) return 0; // So we don't divide by 0
    return Math.round((numCompleted / numGoals) * 100);
  }

  useEffect(() => {
    setCompletionRate(
      calculateCompletionRate(completedGoals.length, goals.length)
    );
  }, [completedGoals, goals]);

  return (
    <div className="completion-rate">
      {completionRate == 100 ? '🔥 100' : `${completionRate}`}%
    </div>
  );
}

export default CompletionRate;
