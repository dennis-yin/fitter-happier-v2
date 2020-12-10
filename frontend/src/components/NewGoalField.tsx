import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Category from './Category';
import Goal, { createGoal } from './Goal';

const useStyles = makeStyles(() => ({
  newGoalField: {
    height: '31px',
    width: '160%',
    fontSize: '1rem'
  }
}));

interface Props {
  currentCategory: Category;
  dispatch: any;
}

export default function NewGoalField({ currentCategory, dispatch }: Props) {
  const classes = useStyles();

  const [description, setDescription] = useState<string>('');

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

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <input
          className={classes.newGoalField}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </>
  );
}
