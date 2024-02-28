import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDay: null,
  eventTitle: "",
  eventUid: null,
  timeStart: "",
  timeEnd: "",
  events: [],
  isShowForm: false,
  isEdit: false,
  timeTo: "",
};

export const eventSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    setCurrentData: (state, action) => {
      state.currentDay = action.payload;
    },
    changeEventTitle: (state, action) => {
      state.eventTitle = action.payload;
    },
    changeTimeStart: (state, action) => {
      state.timeStart = action.payload;
    },
    changeTimeEnd: (state, action) => {
      state.timeEnd = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
      state.eventTitle = "";
      state.timeEnd = "";
      state.timeStart = "";
      state.timeTo = "";
    },
    resetEvent: (state) => {
      state.currentDay = null;
      state.eventTitle = "";
      state.timeStart = "";
      state.timeEnd = "";
      state.isEdit = false;
      state.eventUid = null;
      state.timeTo = "";
    },
    resetEventState: (state) => {
      state.eventTitle = "";
      state.timeEnd = "";
      state.timeStart = "";
      state.isEdit = false;
      state.eventUid = null;
      state.isShowForm = false;
      state.timeTo = "";
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.uid !== action.payload
      );
    },
    changeShowForm: (state, action) => {
      state.isShowForm = action.payload;
    },
    setEditedEvent: (state, action) => {
      state.eventUid = action.payload.uid;
      state.isEdit = true;
      state.eventTitle = action.payload.eventTitle;
      state.timeStart = action.payload.timeStart;
      state.timeEnd = action.payload.timeEnd;
      state.timeTo = action.payload.timeTo;
    },
    changeTimeTo: (state, action) => {
      state.timeTo = action.payload;
    },
    editEvent: (state, action) => {
      const editedEvent = action.payload;
      state.events = state.events.map((event) =>
        event.uid === editedEvent.uid ? editedEvent : event
      );
    },
  },
});

const eventReducer = eventSlice.reducer;

export default eventReducer;
