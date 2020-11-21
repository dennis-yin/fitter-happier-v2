import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Category from './Category';
import Headers from './Headers';

const url = 'http://localhost:3001/api/v1/categories';

interface Props {
  categories: Category[];
  setCurrentCategory: (category: Category) => any;
  setCategories: (categories: Category[]) => any;
  headers: Headers;
}

function createOption(label: string) {
  return {
    label,
    value: label.toLowerCase().replace(/\W/g, '')
  };
}

function CategoriesList(props: Props) {
  const { categories, setCurrentCategory, setCategories, headers } = props;
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
      setCurrentCategory(
        categories.filter((category) => category.title === newValue.label)[0]
      );
    }
  }

  async function handleCreate() {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url,
        headers: headers.formatted,
        data: { category: { title: newCategoryTitle } }
      });
      setOptions([...options, createOption(newCategoryTitle)]);
      setCategories([...categories, new Category(res.data.id, res.data.title)]);
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
      defaultValue={createOption(categories[0].title)}
    />
  );
}

export default CategoriesList;
