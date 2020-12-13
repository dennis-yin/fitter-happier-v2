import React, { useEffect, useState } from 'react';
import '../scss/Streak.scss';
import Category from './Category';
import Goal from './Goal'

interface Props {
  currentCategory: Category;
  goals: Goal[]
}

export default function Streak({ currentCategory, goals }: Props) {
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    Category.fetchStreak(currentCategory.id).then((res) => {
      setStreak(res.data);
    });
  }, [currentCategory, goals]);

  return <>{streak > 1 && <div className="streak">🔥 {streak}</div>}</>;
}
