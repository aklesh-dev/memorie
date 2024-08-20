// src/components/Posts/Posts.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner';

import Post from './Post/Post';

const Posts = ({setCurrentId}) => {
  
  const data = useSelector((state) => state.posts);
  

  // console.log("Posts component - posts state:", data);

  return (
    <section className="mx-1 w-full h-full flex ">
      {!data.length ? (
        <div className='flex justify-center w-full mt-1'>
          <Circles
            height="80"
            width="80"
            color="#D5ED9F"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className='grid md:grid-cols-2 gap-2 '>
          {data.map((post) => (
            <div key={post._id} className="">
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Posts;
