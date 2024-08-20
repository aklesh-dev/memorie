import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/postsSlice";

const store = configureStore({
    reducer: {
        postsSlice,
    }
})
export default store;