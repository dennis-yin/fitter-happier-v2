import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const url = 'http://localhost:3001/api/v1/categories';

function createOption(label) {
  return {
    label,
    value: label.toLowerCase().replace(/\W/g, '')
  };
}

function CategoriesList({ categories, headers }) {
  const defaultOptions = categories.map((category) =>
    createOption(category.attributes.title)
  );

  console.log(defaultOptions)

  const [categoryOptions, setCategoryOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(newValue) {
    setValue(newValue);
  }

  async function handleCreate(inputValue) {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'post',
        headers,
        url
      });
      const newCategory = createOption(inputValue);
      setCategoryOptions(...categoryOptions, newCategory)
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={categoryOptions}
      value={value}
    />
  );
}

export default CategoriesList;
