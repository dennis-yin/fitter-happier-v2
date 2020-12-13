import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Goal from './Goal';

interface Props {
  goals: Goal[];
}

export default function ProgressBar({ goals }: Props) {
  const [progress, setProgress] = useState<number>(0);

  function calculateProgress() {
    if (goals.length === 0) return 0; // So we don't divide by 0
    const completed = goals.filter((goal) => goal.complete).length;
    return Math.round((completed / goals.length) * 100);
  }

  useEffect(() => {
    setProgress(calculateProgress());
  }, [goals]);

  return (
    <div className="progressBar">
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: '#4a90e2'
        })}
      />
    </div>
  );
}
