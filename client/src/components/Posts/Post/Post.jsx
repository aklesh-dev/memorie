import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";

import { imgBaseUrl } from '../../../api';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postState, setPostState] = useState(post);

  useEffect(() => {
    setPostState(post);
  },[post]);

  const handleLike = () => {
    dispatch(likePost(postState._id, () => {
      setPostState({ ...postState, likes: postState.likes + 1 });
    }));
  };

  const handleDelete = async () => {
    dispatch(deletePost(post._id));    
  };


  return (
    <section className="m-2">
      <div className="relative overflow-hidden">
        <img src={`${imgBaseUrl}${post?.selectedFile}`} alt="post-preview" className='hover:shadow-sm object-cover w-full h-48 rounded-lg shadow-sm relative z-10 ' />
        <div className="absolute top-0 w-full flex flex-row-reverse justify-between p-2 z-20">
          {/* --Edit btn-- */}
          <HiDotsHorizontal size={25} className='text-white cursor-pointer'
            onClick={() => {
              setCurrentId(post._id)
              // console.log("Setting current id:", post._id);
            }} />
          <h2 className="h-fit font-palanquin  text-base">{moment(post.createdAt).fromNow()}</h2>
        </div>
        {/* --card detail */}
        <div className="bg-slate-200 rounded-b-md relative -top-3 z-0 p-3">
          <h5 className="text-xl font-bold font-montserrat">{post.title}</h5>

          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="text-blue-500 mr-2 font-palanquin">
              {`#${tag}`}
            </span>
          ))}

          <h2 className="font-palanquin">Creator: {post.creator}</h2>
          <p className="text-gray-700 font-montserrat">{post.message}</p>
          <div className=" mt-4 flex justify-between ">
            {/* --Like Btn-- */}
            <button
              className="flex items-center gap-1 cursor-pointer hover:shadow-md"
              onClick={handleLike}
            >
              <AiOutlineLike className='hover:cursor-pointer text-blue-500' /> Like {post.likeCount}
            </button>
            {/* --delete btn-- */}
            <button
              type='button'
              className="flex items-center gap-1 cursor-pointer relative z-50 hover:shadow-lg"
              onClick={handleDelete}
            >
              <AiOutlineDelete className='text-red-500' /> Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
