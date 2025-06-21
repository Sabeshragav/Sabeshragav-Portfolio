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
      "Typescript",
      "Python",
      "HTML",
      "CSS",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
    [
      "React",
      "Next.js",
      "Vite",
      "TailwindCSS",
      "Express",
      "Node.js",
      "Flask",
      "Spring Boot",
      "WebSocket",
      "JWT",
      "Prisma",
      "Redux-Toolkit",
      "Shadcn UI",
    ],
    [
      "Git",
      "Docker",
      "Vercel",
      "Netlify",
      "Postman",
      "Figma",
      "AWS(S3, Amplify, SES)",
      "Linux (Ubuntu)",
      "Notion",
      "Linear",
    ],
    // ["Testing", "Problem Solving", "Agile", "MVC"],
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
