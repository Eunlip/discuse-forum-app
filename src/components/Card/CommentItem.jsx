import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { Avatar, Tooltip, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { postedAt } from '../../utils';
import { asyncNeutralVoteComment } from '../../states/threadDetail/action';

export default function CommentItem({
  comment, authUser, upVote, downVote,
}) {
  const dispatch = useDispatch();
  const isUpVoted = comment.upVotesBy.includes(authUser);
  const isDownVoted = comment.downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteComment(comment.id, authUser));
    } else {
      if (isDownVoted) {
        downVote(comment.id, null);
      }
      upVote(comment.id, authUser);
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteComment(comment.id, authUser));
    } else {
      if (isUpVoted) {
        upVote(comment.id, null);
      }
      downVote(comment.id, authUser);
    }
  };

  return (
    <section className="flex gap-2 py-5">
      <Avatar
        size="sm"
        variant="circular"
        src={comment.owner.avatar}
        alt={comment.owner.name}
      />
      <div className="px-3 py-2 bg-gray-100 border-2 rounded-md ">
        <header className="flex items-center gap-3 mb-2">
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <div>
                <Typography variant="h6" color="blue-gray">
                  {comment.owner.name}
                </Typography>
              </div>
              <div>
                <Typography variant="small" className="mx-2">•</Typography>
              </div>
              <div className="flex items-center gap-1 ">
                <FaRegClock />
                <p className="text-xs">{postedAt(comment.createdAt)}</p>
              </div>
            </div>
          </div>
        </header>
        <main>
          <Typography className="w-full text-gray-800" dangerouslySetInnerHTML={{ __html: comment.content }} />
        </main>
        <footer>
          <div className="flex gap-4 mt-5 text-xl">
            <Tooltip
              color="light"
              placement="top"
              content="Upvote"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              className="text-xs text-black bg-transparent rounded-full cursor-pointer"
            >
              <button type="button" className="flex items-center gap-1" onClick={onUpVoteClick}>
                <IoChevronUpSharp className={`cursor-pointer ${isUpVoted ? 'text-black' : 'text-sonicSilver'}`} />
                <p className={`text-xs ${isUpVoted ? 'font-bold text-black text-2xl' : ''}`}>
                  {comment.upVotesBy.length}
                </p>
              </button>
            </Tooltip>
            <Tooltip
              color="light"
              placement="top"
              content="Downvote"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              className="text-xs text-black bg-transparent rounded-full cursor-pointer"
            >
              <button type="button" className="flex items-center gap-1" onClick={onDownVoteClick}>
                <IoChevronDownSharp className={`cursor-pointer ${isDownVoted ? 'text-blue-gray-900' : 'text-sonicSilver'}`} />
                <p className={`text-xs ${isDownVoted ? 'font-bold text-black' : ''}`}>
                  {comment.downVotesBy.length}
                </p>
              </button>
            </Tooltip>
          </div>
        </footer>
      </div>
    </section>
  );
}

const commentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
});

CommentItem.propTypes = {
  comment: commentShape.isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export { commentShape };
