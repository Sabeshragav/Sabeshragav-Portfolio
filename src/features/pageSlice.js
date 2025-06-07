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
    [
      "Java",
      "JavaScript",
      "Python",
      "MySQL",
      "PostgreSQL",
      "HTML",
      "CSS",
      "Server Side Rendering(SSR)",
    ],
    [
      "React",
      "Next.js",
      "Vite",
      "TailwindCSS",
      "Redux-Toolkit",
      "Express",
      "REST API",
      "Node.js",
      "Spring Boot",
      "Flask",
      "JWT",
      "WebSocket",
      "AWS(S3, Amplify, SES)",
    ],
    [
      "Git",
      "Docker",
      "Vercel",
      "Netlify",
      "Postman",
      "Figma(basic)",
      "Testing",
      "Problem Solving",
      "Agile",
      "MVC",
      "Linux (Ubuntu)",
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
