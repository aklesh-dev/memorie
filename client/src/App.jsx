import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Nav from './components/Nav';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // console.log('Dispatching getPosts action');
    dispatch(getPosts());
  }, [currentId,dispatch]);

  // --set the scroll to top
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

  return (
    <>
      <main className='h-fit mb-7'>
        <Nav />
        <section className='flex  md:flex-row-reverse flex-col h-screen p-4'>
          {/* --desktop device-- */}
          <section className="flex justify-end max-md:hidden w-fit h-fit flex-initial pr-3">
            <div className="">

              <Form currentId = {currentId}  setCurrentId = {setCurrentId} />
            </div>
          </section>
          {/* --Humburger menu-- */}
          <section className="flex md:hidden">
            <div className="flex w-fit shadow-md p-2">
              <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
            </div>
            {/* --small device-- */}
            {toggleSidebar && (
              <div className="fixed w-4/5  h-fit overflow-y-auto shadow-sm z-30">
                <div className="absolute w-full flex justify-end items-center p-2">
                  <AiFillCloseCircle fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
                </div>
                {/* --mobile-- */}
                <Form closeToggle={setToggleSidebar} currentId = {currentId}  setCurrentId = {setCurrentId} />
              </div>
            )}
          </section>
          {/* --Posts-- */}
          <section className="flex-1 overflow-y-scroll hide-scrollbar" ref={scrollRef}>
            <Posts setCurrentId = {setCurrentId} />
          </section>

        </section>



      </main>
    </>
  )
}

export default App;
