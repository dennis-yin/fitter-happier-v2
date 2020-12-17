import React, { useEffect, useState } from 'react';
import '../scss/GoalsList.scss';
import Goal from './Goal';
import GoalItem from './GoalItem';

interface Props {
  goals: Goal[];
  page: number;
  dispatch: any;
}

const GOALS_PER_PAGE = 5;

export default function GoalsList({ goals, page, dispatch }: Props) {
  const [goalsForPage, setGoalsForPage] = useState<Goal[]>([]);

  useEffect(() => {
    /* This block sorts the goals so that completed ones are on the bottom of
    the list. Then it chooses the correct subset of goals to display based on
    the currently selected page. 
    TODO: Refactor */
    if (goals.length > 0) {
      const sortedGoals = goals.sort((a, b) =>
        a.complete > b.complete ? 1 : a.complete < b.complete ? -1 : 0
      );
      setGoalsForPage(
        sortedGoals.slice(GOALS_PER_PAGE * (page - 1), GOALS_PER_PAGE * page)
      );
    }
  }, [goals, page]);

  return (
    <div className="goalsList">
      {goals.length === 0 ? (
        <p className="message emptyListMessage">
          You haven't made any goals for this day... yet!
        </p>
      ) : (
        goalsForPage.map((goal) => <GoalItem goal={goal} dispatch={dispatch} />)
      )}
    </div>
  );
}
