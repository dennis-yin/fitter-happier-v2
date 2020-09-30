import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CompletionRate from './CompletionRate';

const url = 'http://localhost:3001/api/v1/goals';

export default function GoalsList({
  allGoals,
  setAllGoals,
  filteredGoals,
  headers,
  currentCategory
}) {
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
  }, [...filteredGoals]);

  async function createGoal() {
    try {
      await axios({
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

      try {
        const res = await axios({
          method: 'get',
          url: url,
          headers
        });
        setAllGoals(res.data.data);
      } catch (error) {
        console.log(error);
      }
      console.log('Created goal');
      setDescription('');
    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggle(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const goalComplete = currentIndex ? true : false;

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    try {
      const res = await axios({
        method: 'patch',
        url: `${url}/${value}`,
        headers,
        data: { goal: { complete: goalComplete } }
      });

      const updatedGoals = [...allGoals];
      updatedGoals.forEach((goal, index, array) => {
        if (goal.id === value) array[index].attributes.complete = goalComplete;
      });
      setAllGoals(updatedGoals);
      console.log('Goal updated');
    } catch (error) {
      console.log(error);
    }

    setChecked(newChecked);
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
            <ListItem key={goal.id} dense onClick={() => handleToggle(goal.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(goal.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={goal.attributes.description}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
