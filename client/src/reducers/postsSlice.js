import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        getPostSuccess: (state, action) => {
            // console.log("Reducer - GET_POSTS action payload:", action.payload);
            return action.payload; // Replaces the entire state with fetched posts
        },
        createPostSuccess: (state, action) => {
            state.push(action.payload); // Adds a new post to the state
        },
        updatePostSuccess: (state, action) => {
            const index = state.findIndex(post => post._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload; // Updates the post at the found index
            }
        },
        deletePostSuccess: (state, action) => {
            // console.log("Deleting post with ID:", action.payload); // Log the ID being deleted
            return state.filter(post => post._id !== action.payload); // Removes the post with given ID
        },
        likePostSuccess: (state, action) => {
            const index = state.findIndex(post => post._id === action.payload._id);
            if (index !== -1) {
                state[index].likes += 1; // Increments the likes count of the post
            }
        },
    }
});

export const { getPostSuccess, createPostSuccess, updatePostSuccess, deletePostSuccess, likePostSuccess } = postsSlice.actions;
export default postsSlice.reducer;
