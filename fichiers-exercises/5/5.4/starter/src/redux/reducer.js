import { createSlice } from "@reduxjs/toolkit";
const items = [
  { id: 1, task: "pay bills", done: false },
  { id: 2, task: "buy groceries", done: false },
  { id: 3, task: "learn Redux", done: false },
];
const initialState = {
  items,
  all: items,
  isFiltered: false,
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    submit: (state, action) => {
      state.items = [...state.items, action.payload];
      state.all = [...state.all, action.payload];
    },
  },
});
