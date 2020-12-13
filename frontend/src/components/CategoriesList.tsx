import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Category from './Category';

interface Props {
  categories: Category[];
  dispatch: any;
}

function createOption(label: string) {
  return {
    label,
    value: label.toLowerCase().replace(/\W/g, '')
  };
}

function CategoriesList({ categories, dispatch }: Props) {
  const [options, setOptions] = useState<any>();
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setOptions(categories.map((category) => createOption(category.title)));
  }, [categories]);

  function handleInputChange(inputValue: string) {
    setNewCategoryTitle(inputValue);
  }

  function handleChange(newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      dispatch({ type: 'SELECT_CATEGORY', data: newValue.label });
    }
  }

  function handleCreate() {
    setIsLoading(true);
    Category.create(newCategoryTitle).then((_) => {
      Category.fetch().then((res) => {
        dispatch({ type: 'SET_CATEGORIES', data: res.data.data });
        setIsLoading(false);
      });
    });
  }

  return (
    <CreatableSelect
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      options={options}
      defaultValue={createOption(categories[0].title)}
    />
  );
}

export default CategoriesList;
