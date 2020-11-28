import { State } from '../components/AuthenticatedApp';
import Category from '../components/Category';
import Goal from '../components/Goal';

export default function reducer(state: State, action: any) {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading
      };

    case 'SET_CATEGORIES':
      const categories = action.data.map(
        (category: any) => new Category(category.id, category.attributes.title)
      );

      if (action.initialRender) {
        return {
          ...state,
          categories,
          currentCategory: categories[0]
        };
      } else {
        return {
          ...state,
          categories
        };
      }

    case 'CREATE_CATEGORY':
      return;

    case 'DELETE_CATEGORY':
      return;

    case 'SELECT_CATEGORY':
      const selectedCategory = state.categories.filter(
        (category) => category.title === action.data
      )[0];
      return {
        ...state,
        currentCategory: selectedCategory
      };

    case 'SET_GOALS':
      return {
        ...state,
        goals: action.data.map(
          (goal: any) =>
            new Goal(
              goal.id,
              goal.attributes.user_id,
              goal.attributes.description,
              goal.attributes.complete,
              goal.attributes.category_id
            )
        )
      };

    case 'CREATE_GOAL':
      return {
        ...state,
        goals: [...state.goals, action.data.newGoal]
      };

    case 'UPDATE_GOAL':
      const newGoals = [
        ...state.goals.filter((goal) => goal.id !== action.data.updatedGoal.id),
        action.data.updatedGoal
      ];
      return {
        ...state,
        goals: newGoals
      };

    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.data.id)
      };

    case 'SELECT_DAY':
      return {
        ...state,
        selectedDay: action.data
      };

    default:
      throw new Error(`Unsupported action: ${action.type}`);
  }
}
