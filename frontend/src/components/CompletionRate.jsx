import React, { useState, useEffect } from 'react';

function CompletionRate({ completedGoals, goals }) {
  const [completionRate, setCompletionRate] = useState(0);

  function calculateCompletionRate(numCompleted, numGoals) {
    return Math.round(numCompleted / numGoals * 100);
  }

  useEffect(() => {
    setCompletionRate(
      calculateCompletionRate(completedGoals.length, goals.length)
    );
  }, [completedGoals, goals]);

  return <div className="completion-rate">{completionRate}%</div>;
}

export default CompletionRate;
