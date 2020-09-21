import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const url = 'http://localhost:3001/api/v1/goals';

export default function GoalsList({ goals, headers }) {
  const [description, setDescription] = useState('');

  async function createGoal() {
    try {
      await axios({
        method: 'post',
        url,
        headers,
        data: { goal: { description } }
      });
      console.log('Created goal');
      setDescription('');
    } catch (err) {
      console.log(err);
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
      {goals.map((goal) => (
        <p>{`${goal.attributes.user_id} - ${goal.attributes.description}`}</p>
      ))}
    </>
  );
}
