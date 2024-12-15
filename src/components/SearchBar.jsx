"use client";
import { fetchArticles } from "@/features/articleSlice";
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
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
      } else if (searchVal.trim() == "") {
        dispatch(fetchArticles(""));
      } else alert("Enter a valid search");

      setSearchReq(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="gap-2 border rounded-full flex items-center justify-center p-2"
      >
        <label htmlFor="datasetInp">
          <CgSearch className="h-6 w-6 pl-1 text-gray-400" />
        </label>
        <input
          disabled={searchReq}
          onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
          className="outline-none text-lg text-gray-200 rounded-r-full bg-transparent"
          type="text"
          id="datasetInp"
          placeholder="Search Articles"
        />
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
