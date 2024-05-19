import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentShape } from './Card/CommentItem';

export default function Comment({
  comments, upVote, downVote, authUser,
}) {
  return (
    <>
      <h2 className="text-[16px] mt-5 mb-2 font-semibold text-gray-800">
        Comments (
        {comments.length}
        )
      </h2>
      <div className="max-h-96 scrollbar">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              upVote={upVote}
              downVote={downVote}
              authUser={authUser}
            />
          ))
        ) : (
          <h2 className="mb-10">No comments yet.</h2>
        )}
      </div>
    </>
  );
}

Comment.propTypes = {
  comments: PropTypes.arrayOf(commentShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};
