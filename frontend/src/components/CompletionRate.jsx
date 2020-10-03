import React, { useState, useEffect } from 'react';

function CompletionRate({ completedGoals, goals }) {
  const [completionRate, setCompletionRate] = useState(0);

  function calculateCompletionRate(numCompleted, numGoals) {
    if (numGoals === 0) return 0; // So we don't divide by 0
    return Math.round(numCompleted / numGoals * 100);
  }

  useEffect(() => {
    setCompletionRate(
      calculateCompletionRate(completedGoals.length, goals.length)
    );
  }, [completedGoals, goals]);

  return <div className="completion-rate">{completionRate == 100 ? '🔥 100' : `${completionRate}`}%</div>;
}

export default CompletionRate;
