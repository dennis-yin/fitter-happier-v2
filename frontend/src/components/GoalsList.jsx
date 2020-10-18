import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import CompletionRate from './CompletionRate';

const url = 'http://localhost:3001/api/v1/goals';

const useStyles = makeStyles(() => ({
  listItem: {
    width: '25em'
  }
}));

export default function GoalsList({
  allGoals,
  setAllGoals,
  filteredGoals,
  setFilteredGoals,
  headers,
  currentCategory
}) {
  const classes = useStyles();

  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState([]);

  function checkCompleteStatus(goals) {
    const goalIds = [];
    goals.forEach((goal) => {
      if (goal.attributes.complete) {
        goalIds.push(goal.id);
      }
    });
    return goalIds;
  }

  useEffect(() => {
    setChecked(checkCompleteStatus(filteredGoals));
  }, [filteredGoals]);

  async function createGoal() {
    try {
      const res = await axios({
        method: 'post',
        url,
        headers,
        data: {
          goal: {
            description,
            category_id: currentCategory.id
          }
        }
      });

      setAllGoals([...allGoals, res.data.data]);
      setFilteredGoals([...filteredGoals, res.data.data]);
      console.log('Created goal');
    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggle(goalId) {
    const currentIndex = checked.indexOf(goalId);
    const newChecked = [...checked];
    const goalComplete = currentIndex ? true : false;

    if (currentIndex === -1) {
      newChecked.push(goalId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    try {
      await axios({
        method: 'patch',
        url: `${url}/${goalId}`,
        headers,
        data: { goal: { complete: goalComplete } }
      });

      const updatedGoals = [...allGoals];
      updatedGoals.forEach((goal, index, array) => {
        if (goal.id === goalId) {
          array[index].attributes.complete = goalComplete;
        }
      });
      setAllGoals(updatedGoals);
      setChecked(newChecked);
      console.log('Goal updated');
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteGoal(id) {
    if (checked.includes(id)) {
      const index = checked.indexOf(id);
      const updatedChecked = [...checked];
      updatedChecked.splice(index, 1);
      setChecked(updatedChecked);
    }

    const updatedFilteredGoals = filteredGoals.filter((goal) => goal.id !== id);
    setFilteredGoals(updatedFilteredGoals);

    const updatedGoals = allGoals.filter((goal) => goal.id !== id);
    setAllGoals(updatedGoals);

    try {
      await axios({
        method: 'delete',
        url: `${url}/${id}`,
        headers
      });
      console.log('Goal deleted');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createGoal();
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
              <ListItemText
                id={labelId}
                primary={goal.attributes.description}
              />
              <CloseIcon onClick={() => deleteGoal(goal.id)} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
