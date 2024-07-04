import React from "react";

export const SearchBox = ({ placeholder, handleChange }) => (
  <input
    className=" text-center rounded-full place-items-center m-4 w-[320px] "
    type="search"
    placeholder={placeholder}
    onChange={handleChange}
  />
);
