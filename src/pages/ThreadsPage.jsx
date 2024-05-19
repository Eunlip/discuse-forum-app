/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidCategory } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import ModalButton from '../components/Modal';
import Button from '../components/Button';
import { SearchInput } from '../components/Input';
import { asyncCreateThread, asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import ThreadList from '../components/ThreadList';
import { asyncFetchFilteredThreads } from '../states/searchFilter/action';

export default function ThreadsPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const dispatch = useDispatch();

  const { threads, users, authUser } = useSelector((state) => ({
    threads: state.threads || [],
    users: state.users || [],
    authUser: state.authUser || null,
  }));

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
    setIsModalOpen(false);
  };

  const onUpVote = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
    dispatch(asyncFetchFilteredThreads(keyword));
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const filteredThreads = threads.filter((thread) => (
    (activeCategory ? thread.category.toLowerCase() === activeCategory.toLowerCase() : true)
    && thread.title.toLowerCase().includes(keyword.toLowerCase())));

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const handleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <div>
      <main className="container p-5 mx-auto my-20 rounded-xl sm:my-28">
        <div className="items-end justify-between px-1 sm:flex ">
          <h2 className="text-2xl font-semibold text-center sm:text-start text-blue-gray-800">Discussion Available</h2>
          <ModalButton
            createThread={onAddThread}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        </div>
        <SearchInput search={keyword} onSearchChange={onKeywordChangeHandler} />
        <div className="block gap-5 lg:flex">
          <div className="p-5 mb-10 bg-white rounded-lg shadow h-fit flex-2">
            <span className="flex items-center gap-2 mb-1">
              <BiSolidCategory />
              <h2 className="text-lg font-semibold text-yankeesBlue">Category</h2>
            </span>
            <hr className="my-2" />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategory(category)}
                className={`text-xs m-1 font-normal  lowercase border-2 rounded-full ${
                  activeCategory === category ? 'bg-bussYellow' : 'bg-inherit'
                } border-mustardYellow text-yankeesBlue`}
                size="sm"
              >
                #
                {category}
              </Button>
            ))}
          </div>
          <div className="grid items-baseline justify-between h-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
            {filteredThreads.length > 0 ? (
              <ThreadList threads={threadList} upVote={onUpVote} downVote={onDownVote} />
            ) : (
              <p>No Threads found.</p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="fixed block p-3 text-white transition duration-300 bg-blue-500 rounded-full shadow-lg sm:hidden bottom-5 right-5 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={24} />
        </button>
      </main>
    </div>
  );
}
