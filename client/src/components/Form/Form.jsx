import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  // --if current id is not null then loop over, which match post id with the current id--
  const post = useSelector((state) => {
    // console.log('Finding post with currentId:', currentId);
    // console.log('Posts available in state:', state.posts);    
    const foundPost = currentId ? state.posts.find((post) => post._id === currentId) : null
    // console.log('Post to Edit:', foundPost);
    return foundPost;
  });

  const { register, handleSubmit, formState: { errors }, reset, } = useForm();

  // --Populate the form fields when a post is being edited
  useEffect(() => {
    if (currentId && post) {      
      reset({
        creator: post.creator,
        title: post.title,
        message: post.message,
        tags: post.tags.join(', '),
      });
    } 
  }, [post, reset, currentId]);


  const onSubmit = data => {
    const formData = new FormData();
    formData.append('creator', data.creator);
    formData.append('title', data.title);
    formData.append('message', data.message);
    //--Split the tags string into an array, and trim each tag
    // const tagsArray = data.tags.split(',')
    formData.append('tags', data.tags);

    if (data.selectedFile[0]) {
      formData.append('selectedFile', data.selectedFile[0]);
    }

    // --if current id is not null update the post else create a post
    if (currentId) {
      dispatch(updatePost(currentId, formData))
    } else {
      dispatch(createPost(formData))
    }
    setCurrentId(null);
    reset({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    }); // This clears the form inputs after submission    
  };

  

  return (
    <section className="bg-gray-300 mt-2 p-2 h-fit w-full rounded-lg mr-2">
      <div className="flex justify-center">
        <h2 className="font-palanquin font-bold text-2xl gradient-text ">{currentId ? 'Editing a Memory' : 'Create a Memory'}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method='POST' encType='multipart/form-data' className='flex flex-col gap-2 p-2'>
        <input
          className='outline-none rounded-md p-2'
          type='text'
          placeholder='Creator'
          {...register('creator', { required: { value: true, message: 'This field is required.' } })}
        />
        {errors.creator && <span>{errors.creator.message}</span>}

        <input
          className='outline-none rounded-md p-2'
          type='text'
          placeholder='Title'
          {...register('title', { required: { value: true, message: 'This field is required.' } })}
        />
        {errors.title && <span>{errors.title.message}</span>}

        <input
          className='outline-none rounded-md p-2'
          type='text'
          placeholder='Message'
          {...register('message', { required: { value: true, message: 'This field is required.' } })}
        />
        {errors.message && <span>{errors.message.message}</span>}

        <input
          className='outline-none rounded-md p-2'
          type='text'
          placeholder='Tags'
          {...register('tags', { required: { value: true, message: 'This field is required.' } })}
        />
        {errors.tags && <span>{errors.tags.message}</span>}

        <input
          className='outline-none rounded-md p-2'
          type='file'
          placeholder='Selected File'
          {...register('selectedFile', { required: { value: true, message: 'This field is required.' } })}
        />
        {errors.selectedFile && <span>{errors.selectedFile.message}</span>}

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Form;
