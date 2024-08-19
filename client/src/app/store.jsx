import { configureStore } from "@reduxjs/toolkit";
import posts from "../reducers/posts";

const store = configureStore({
    reducer: {
        posts,
    }
})
export default store;