// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { apiSlice } from "../api/apiSlice";
// import authReducer from './auth/authSlice'

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// setupListeners(store.dispatch);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ Corrected this line
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents non-serializable errors
    }).concat(apiSlice.middleware),

  devTools: true,
});

// Enables automatic refetching for RTK Query
setupListeners(store.dispatch);

export default store;
