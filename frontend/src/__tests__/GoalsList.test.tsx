import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import GoalsList, { Props } from '../components/GoalsList';
import Headers from '../components/Headers';
import Category from '../components/Category'

const props = {
  allGoals: [],
  setAllGoals: jest.fn(),
  filteredGoals: [],
  setFilteredGoals: jest.fn(),
  headers: new Headers,
  currentCategory: new Category
}

describe('<GoalsList />', () => {
  test('renders the field to add a new goal', async () => {
    const { getByText } = render(<GoalsList {} />)
  });
});
