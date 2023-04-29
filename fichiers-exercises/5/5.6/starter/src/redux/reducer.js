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

export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    submit: (state, action) => {
      state.items = [...state.items, action.payload];
      state.all = [...state.all, action.payload];
    },
    show: (state, action) => {
      state.isFiltered = action.payload;
    },
    check: (state, action) => {
      const updated = state.all.map((item) => {
        return item.id === action.payload
          ? { ...item, done: !item.done }
          : item;
      });
      state.items = updated;
      state.all = updated;
    },
    archive: (state) => {
      const updated = state.all.filter((item) => !item.done);
      state.items = updated;
      state.all = updated;
    },
  },
});

export const selectItems = ({ checklist }) => {
  const { isFiltered, all } = checklist;
  if (isFiltered) {
    return all.filter((item) => item.done);
  }
  return all;
};

export const { submit, show, check, archive } = checklistSlice.actions;

export default checklistSlice.reducer;
