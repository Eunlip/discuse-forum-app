/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Avatar } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '../Button';
import useInput from '../../hooks/useInput';

export default function ThreadReplyInput({ replyComment }) {
  const [content, onContentChange] = useInput('');
  const { avatar } = useSelector((states) => states.authUser);

  function replyCommentHandler() {
    replyComment({ content });
    onContentChange({ target: { value: '' } });
  }

  return (
    <div className="my-8">
      <h2 className="text-[16px] font-semibold text-gray-800">Leave a Comment</h2>
      <div className="flex gap-2 my-5">
        <Avatar src={avatar} alt={avatar} size="sm" />
        <textarea
          type="text"
          className="w-full p-5 border rounded-lg bg-blue-gray-50 focus:outline-none focus:shadow-inner h-44 "
          value={content}
          onChange={onContentChange}
          placeholder="Type a comment..."
        />
      </div>
      <Button type="submit" onClick={replyCommentHandler} className="text-sm hover:shadow-none bg-blue-gray-600 hover:bg-blue-gray-500" fullWidth>Reply</Button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyComment: PropTypes.func.isRequired,
};
