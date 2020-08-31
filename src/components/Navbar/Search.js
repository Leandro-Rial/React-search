import React, { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import { Input } from "antd";
import './style.css';

export const Search = () => {
  const [inputItems, setInputItems] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        country.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className="Search">
      <div {...getComboboxProps()} className="filtered">
        <Input
          type="text"
          placeholder="Search"
          className="search"
          enterButton="Search"
          {...getInputProps()}
        />
      </div>
      <ul {...getMenuProps()} className="filter">
        {isOpen &&
          inputItems.map((item, index) => (
            <span
              key={item.name}
              {...getItemProps({ item, index })}
              // onClick={() => setSingleCountry(item.name)}
            >
              <li className={highlightedIndex === index ? 'countries' : 'countries'}>
                <img src={item.flag} alt={item.name} className="flags"/>
                <h4>{item.name}</h4>
              </li>
            </span>
          ))}
      </ul>
    </div>
  );
};
