import * as api from '../api';
import { createPostSuccess, deletePostSuccess, getPostSuccess, likePostSuccess, updatePostSuccess } from '../reducers/postsSlice';

// Action creator
export const getPosts = () => async (dispatch) => {
    try {
        // console.log("getPosts action creator called"); // Logs when the action is invoked
        const response = await api.fetchPosts();
        // console.log("API response received:", response.data); // Logs the data received from the API
        dispatch(getPostSuccess(response.data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const createPost = (post) => {
    return async (dispatch) => {
        try {
            const response = await api.createPost(post);
            dispatch(createPostSuccess(response.data));
        } catch (error) {
            console.error('Error creating post:',error);
        }
    } 
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        // console.log("Updating post with Id:", id, 'Data:', updatedPost);
        const { data } = await api.updatePost(id, updatedPost); //  api.updatePost returns the updated post data
        // console.log('Updated Post Data:', data);
        dispatch(updatePostSuccess(data));
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

export const deletePost = (id) => async(dispatch) => {
    try {
        // --Send a delete request to the server with the post Id
        await api.deletePost(id);
        // --Dispatch an action to remove the post from the Redux state
        dispatch(deletePostSuccess(id));
    } catch (err) {
        console.error('Error deleting post:', err);        
    }
};

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch(likePostSuccess(data));
    } catch (error) {
        console.error('Error liking post:', error);        
    }
}