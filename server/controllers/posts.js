import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import fs from 'fs';
import path from "path";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {

    // Extract form data and file
    const { creator, title, message, tags } = req.body;
    const selectedFile = req.file; // This is the file object.

    const newPost = new PostMessage({
        creator,
        title,
        message,
        tags,
        selectedFile: selectedFile.path, // Save the file path 
    });

    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // --check if ID exist or not
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');

    try {
        // -- Find the existing post
        const existingPost = await PostMessage.findById(_id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // --If a new file is uploaded, handle the file replacement
        if (req.file) {
            // Delete the old file if it exists
            if (existingPost.selectedFile) {
                fs.unlinkSync(existingPost.selectedFile);
            }
            // Update the post with the new file path
            post.selectedFile = req.file.path;
        }

        // Update the post document
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    // --check if ID exist or not
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');

    try {
        // -- Find the existing post
        const post = await PostMessage.findById(_id);
        if (post) {
            // --Delete the file associated with the post
            if (post.selectedFile) {
                fs.unlinkSync(post.selectedFile);
            }
            // Delete the post
            await PostMessage.findOneAndDelete(_id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    // --check if ID exist or not
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');
    try {
        const post = await PostMessage.findById(_id);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
        res.status(200).json(updatedPost);        
    } catch (err) {
        res.status(404).json({ message: err.message });        
    }
}