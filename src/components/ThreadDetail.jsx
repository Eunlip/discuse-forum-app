import React from 'react';
import { Avatar, Tooltip, Typography } from '@material-tailwind/react';
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { postedAt } from '../utils';
import { asyncNeutralVoteDetail } from '../states/threadDetail/action';

export default function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  authUser,
}) {
  const dispatch = useDispatch();
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteDetail(id));
    } else {
      if (isDownVoted) {
        downVote(id, null);
      }
      upVote(id, authUser);
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteDetail(id));
    } else {
      if (isUpVoted) {
        upVote(id, null);
      }
      downVote(id, authUser);
    }
  };

  return (
    <section className="bg-white rounded-xl">
      <header>
        <Button className="px-3 py-1 font-normal lowercase border rounded-full shadow-none cursor-default bg-bussYellow hover:shadow-none border-mustardYellow text-yankeesBlue" size="sm" ripple={false}>
          #
          {category}
        </Button>
        <div className="flex items-center gap-3 py-5">
          <Avatar
            size="sm"
            variant="circular"
            src={owner.avatar}
            alt={owner.name}
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <div>
                <Typography variant="h6" color="blue-gray">
                  {owner.name}
                </Typography>
              </div>
              <div>
                <Typography variant="small" className="mx-2">•</Typography>
              </div>
              <div className="flex items-center gap-2 ">
                <FaRegClock />
                <p className="text-xs">{postedAt(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Typography className="mb-3 text-gray-900" variant="h4" dangerouslySetInnerHTML={{ __html: title }} />
        <Typography className="overflow-x-auto text-gray-800" dangerouslySetInnerHTML={{ __html: body }} />
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
              <IoChevronUpSharp className={`cursor-pointer text-sonicSilver ${isUpVoted ? 'text-black' : ''}`} />
              <p className={`text-xs ${isUpVoted ? 'font-bold text-black text-2xl' : ''}`}>{upVotesBy.length}</p>
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
              <IoChevronDownSharp className={`cursor-pointer text-sonicSilver ${isDownVoted ? 'text-blue-gray-900' : ''}`} />
              <p className={`text-xs ${isDownVoted ? 'font-bold text-black' : ''}`}>{downVotesBy.length}</p>
            </button>
          </Tooltip>
        </div>
      </footer>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};
