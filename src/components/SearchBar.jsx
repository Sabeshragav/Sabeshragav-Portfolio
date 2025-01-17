"use client";
import { fetchArticles } from "@/features/articleSlice";
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSearchVal, setSearchVal } from "@features/pageSlice";
import { toast } from "react-toastify";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [searchReq, setSearchReq] = useState(false);

  const searchVal = useSelector(getSearchVal);

  const containsValidCharacters = (str) => /^[a-zA-Z0-9\s]*$/.test(str);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchReq) {
      setSearchReq(true);

      if (searchVal.trim() && containsValidCharacters(searchVal.trim())) {
        dispatch(fetchArticles(searchVal.trim()));
      } else if (searchVal.trim() === "") {
      } else toast.warning("Enter a valid search");

      setSearchReq(false);
    }
  };

  const handleXClick = () => {
    dispatch(fetchArticles());
    dispatch(setSearchVal(""));
  };

  return (
    <div className="flex items-center gap-3 pb-4 md:pb-7 border-b border-b-gray-800 md:border-none">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="gap-2 border rounded-full flex items-center justify-center p-1 md:p-2 relative bg-white"
      >
        <label htmlFor="Inp">
          <CgSearch className="h-6 w-6 pl-1 text-black" />
        </label>
        <input
          disabled={searchReq}
          value={searchVal}
          onChange={(e) => dispatch(setSearchVal(e.target.value.toLowerCase()))}
          className="outline-none text-sm md:text-base text-black rounded-r-full bg-transparent w-44 pr-7"
          type="text"
          id="Inp"
          placeholder="Search"
        />
        {searchVal.trim() && (
          <button
            type="button"
            onClick={handleXClick}
            className="absolute right-2 text-black"
            aria-label="Clear search"
          >
            <AiOutlineClose className="h-5 w-5" />
          </button>
        )}
      </form>

      <button
        title="Search"
        disabled={searchReq}
        onClick={(e) => handleSearch(e)}
        className={`${
          searchReq ? "hover:cursor-not-allowed" : ""
        } inline-block bg-white text-black text-sm md:text-lg p-2 rounded-full hover:bg-slate-200 transition duration-300`}
      >
        Search
      </button>
    </div>
  );
}
