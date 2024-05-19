import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function ThreadInput({ createThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();

    createThread({ title, category, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="my-8">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-3 border-2 rounded-lg placeholder:text-lg"
            value={title}
            onChange={onTitleChange}
            placeholder="Insert your title here"
          />
        </div>
        <div>
          <label htmlFor="category" className="font-semibold">Category</label>
          <div className="relative">
            <input
              type="text"
              id="category"
              className="w-full py-3 border-2 rounded-lg px-7 placeholder:text-lg"
              value={category}
              onChange={onCategoryChange}
              placeholder="Insert thread category here"
            />
            <p className="absolute top-3.5 left-4">#</p>
          </div>
        </div>
        <div className="my-8">
          <textarea
            className="w-full h-56 px-4 py-3 border-2 rounded-lg placeholder:text-xl"
            value={body}
            onChange={onBodyChange}
            placeholder="Please fill in what u would like to discuss ..."
          />
        </div>
        <button type="submit" className="w-full px-5 py-3 font-semibold text-white rounded-lg bg-blue-gray-600 hover:bg-blue-gray-500" title="create" onClick={handleSubmit}>Create</button>
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};
