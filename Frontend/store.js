import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songReducer from "./features/songs/songsSlice";
import albumReducer from "./features/songs/albumslice";    
import reviewReducer from "./features/songs/Reviewslice"; 
import userReducer from "./features//songs/userSlice";       
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
    albums: albumReducer,
    reviews: reviewReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
