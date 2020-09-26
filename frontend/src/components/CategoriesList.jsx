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

function CategoriesList({ categories, headers }) {
  const [options, setOptions] = useState();
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOptions(
      categories.map((category) => createOption(category.attributes.title))
    );
  }, [categories]);

  function handleInputChange(inputValue, actionMeta) {
    setNewCategoryTitle(inputValue);
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
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      options={options}
    />
  );
}

export default CategoriesList;
