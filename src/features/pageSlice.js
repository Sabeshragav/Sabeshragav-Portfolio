import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewPosition: "",
  searchVal: "",
  words: [
    "Insights",
    "Portfolio",
    "Sphere",
    "Perspectives",
    "Moments",
    "Displays",
    "Ideas",
  ],
  allSkills: [
    ["Java", "JavaScript", "Python", "MySQL", "PostgreSQL", "HTML5", "CSS3"],
    [
      "React",
      "Next.js",
      "Vite",
      "TailwindCSS",
      "Redux-Toolkit",
      "Express",
      "Node.js",
      "Spring Boot",
      "Django",
      "JWT",
      "WebSocket",
    ],
    [
      "Git",
      "Docker",
      "Supabase",
      "Vercel",
      "Netlify",
      "Postman",
      "CI/CD",
      "Pair Programming",
      "Problem Solving",
      "Linux (Ubuntu)",
      "DevOps",
    ],
  ],
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    handleScrollToTop: () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setViewPosition: (state, action) => {
      state.viewPosition = action.payload;
    },
  },
});

export const getSearchVal = (state) => state.pages.searchVal;
export const getViewPosition = (state) => state.pages.viewPosition;
export const getWords = (state) => state.pages.words;
export const getAllSkils = (state) => state.pages.allSkills;

export const { handleScrollToTop, setSearchVal, setViewPosition } =
  pageSlice.actions;

export const pageReducer = pageSlice.reducer;
