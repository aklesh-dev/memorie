import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:5000/posts';

// API functions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(url);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
    const response = await axios.post(url, newPost, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
    const response = await axios.patch(`${url}/${id}`, updatedPost, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
});

// Initial state
const initialState = {
    posts: [],
    status: 'idle',
    error: null,
};

// Slice
const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

export default posts.reducer;
