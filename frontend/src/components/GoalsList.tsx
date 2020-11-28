import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CompletionRate from './CompletionRate';
import Goal, { createGoal, toggleComplete, deleteGoal } from './Goal';
import Category from './Category';

const useStyles = makeStyles(() => ({
  listItem: {
    width: '25em'
  }
}));

interface Props {
  goals: Goal[];
  currentCategory: Category;
  dispatch: any;
}

function filterGoals(goals: Goal[], category: Category) {
  if (goals.length > 0) {
    return goals.filter((goal) => goal.category_id === Number(category.id));
  }
  return [];
}

export default function GoalsList({ goals, currentCategory, dispatch }: Props) {
  const classes = useStyles();

  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [description, setDescription] = useState<string>('');
  const [checked, setChecked] = useState<number[]>([]);

  function checkCompleteStatus(goals: Goal[]): number[] {
    const goalIds: number[] = [];
    goals.forEach((goal) => {
      if (goal.complete) {
        goalIds.push(goal.id);
      }
    });
    return goalIds;
  }

  useEffect(() => {
    setFilteredGoals(filterGoals(goals, currentCategory));
  }, [currentCategory, goals]);

  useEffect(() => {
    setChecked(checkCompleteStatus(goals));
  }, [goals]);

  function handleCreate() {
    createGoal(description, currentCategory.id)
      .then((res) => {
        debugger;
        const {
          id,
          attributes: { user_id, description, complete, category_id }
        } = res.data.data;
        const newGoal = new Goal(
          id,
          user_id,
          description,
          complete,
          category_id
        );
        dispatch({ type: 'CREATE_GOAL', data: { newGoal } });
      })
      .catch((err) => console.log(err));
    setDescription('');
    console.log('Created goal');
  }

  function handleToggle(id: number) {
    const currentIndex = checked.indexOf(id);
    const isComplete = currentIndex >= 0 ? true : false;

    if (currentIndex === -1) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((_) => checked.indexOf(_) !== currentIndex));
    }

    toggleComplete(id, isComplete)
      .then((res) => {
        const {
          id,
          attributes: { user_id, description, complete, category_id }
        } = res.data.data;
        const updatedGoal = new Goal(
          id,
          user_id,
          description,
          complete,
          category_id
        );
        dispatch({
          type: 'UPDATE_GOAL',
          data: { updatedGoal }
        });
        console.log('Goal updated');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(id: number) {
    deleteGoal(id)
      .then((res) => {
        if (checked.includes(id)) {
          setChecked([...checked.filter((c) => c !== id)]);
        }
        dispatch({ type: 'DELETE_GOAL', data: { id } });
        console.log('Goal deleted');
      })
      .catch((err) => console.log('Error deleting goal'));
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <TextField
          id="standard-basic"
          label="Enter a new goal"
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <CompletionRate completedGoals={checked} goals={filteredGoals} />
      <List>
        {filteredGoals.map((goal) => {
          const labelId = `checkbox-list-label-${goal.id}`;

          return (
            <ListItem key={goal.id} className={classes.listItem} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(goal.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={() => handleToggle(goal.id)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={goal.description} />
              <CloseIcon onClick={() => handleDelete(goal.id)} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
