import React, { useState } from 'react';
import '../scss/NewGoalField.scss';
import Category from './Category';
import Goal from './Goal';

const CHAR_LIMIT = 50;

interface Props {
  currentCategory: Category;
  date: string;
  dispatch: any;
}

export default function NewGoalField({ currentCategory, date, dispatch }: Props) {
  const [description, setDescription] = useState<string>('');
  const [charsLeft, setCharsLeft] = useState<number>(CHAR_LIMIT);

  function handleChange(input: string) {
    setDescription(input);
    setCharsLeft(CHAR_LIMIT - input.length);
  }

  function handleCreate() {
    if (description.length <= CHAR_LIMIT) {
      Goal.create(description, currentCategory.id, date)
        .then((res) => {
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
      setCharsLeft(CHAR_LIMIT);
      console.log('Created goal');
    }
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
          className="newGoalField"
          type="text"
          value={description}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className={`charsLeft ${charsLeft < 0 ? 'overLimit' : ''}`}>
          {charsLeft}
        </div>
      </form>
    </>
  );
}
