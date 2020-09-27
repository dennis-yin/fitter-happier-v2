import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const url = 'http://localhost:3001/api/v1/categories';

function createOption(label) {
  return {
    label,
    value: label.toLowerCase().replace(/\W/g, '')
  };
}

function CategoriesList({ categories, setCurrentCategory, headers }) {
  const [options, setOptions] = useState();
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOptions(
      categories.map((category) => createOption(category.attributes.title))
    );
  }, [categories]);

  function handleInputChange(inputValue) {
    setNewCategoryTitle(inputValue);
  }

  function handleChange(newValue, actionMeta) {
    if (actionMeta.action === 'select-option') {
      const category = categories.filter(
        (category) => category.attributes.title === newValue.label
      )[0];
      setCurrentCategory(category);
    }
  }

  async function handleCreate() {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url,
        headers,
        data: { category: { title: newCategoryTitle } }
      });
      const newOption = createOption(newCategoryTitle);
      setOptions([...options, newOption]);
      categories = [...categories, newCategoryTitle];
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <CreatableSelect
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      options={options}
      defaultValue={createOption(categories[0].attributes.title)}
    />
  );
}

export default CategoriesList;
