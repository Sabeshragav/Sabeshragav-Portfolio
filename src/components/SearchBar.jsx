"use client";
import { fetchArticles } from "@/features/articleSlice";
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [searchReq, setSearchReq] = useState(false);

  const containsValidCharacters = (str) => /^[a-zA-Z0-9\s]*$/.test(str);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchReq) {
      setSearchReq(true);

      if (searchVal.trim() && containsValidCharacters(searchVal.trim())) {
        dispatch(fetchArticles(searchVal.trim()));
      } else if (searchVal.trim() === "") {
        dispatch(fetchArticles());
      } else alert("Enter a valid search");

      setSearchReq(false);
    }
  };

  const handleXClick = () => {
    dispatch(fetchArticles());
    setSearchVal("");
  };

  return (
    <div className="flex items-center gap-3 pb-7 border-b border-b-gray-800 md:border-none">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="gap-2 border rounded-full flex items-center justify-center p-2 relative"
      >
        <label htmlFor="Inp">
          <CgSearch className="h-6 w-6 pl-1 text-gray-400" />
        </label>
        <input
          disabled={searchReq}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
          className="outline-none text-lg text-gray-200 rounded-r-full bg-transparent w-44 pr-7"
          type="text"
          id="Inp"
          placeholder="search projects"
        />
        {searchVal.trim() && (
          <button
            type="button"
            onClick={handleXClick}
            className="absolute right-2 text-gray-200"
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
        className={`border rounded-full p-2 ${
          searchReq ? "hover:cursor-not-allowed" : ""
        }`}
      >
        Search
      </button>
    </div>
  );
}
