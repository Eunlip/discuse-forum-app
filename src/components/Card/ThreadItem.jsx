import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa6';
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';
import { TbMessages } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { postedAt } from '../../utils';
import { asyncNeutralVoteThread } from '../../states/threads/action';

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments,
  upVotesBy,
  downVotesBy,
  handleUpVote = null,
  handleDownVote = null,
  user,
  authUser,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      if (isDownVoted) {
        handleDownVote(id, null);
      }
      handleUpVote(id, authUser);
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      if (isUpVoted) {
        handleUpVote(id, null);
      }
      handleDownVote(id, authUser);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <Card color="white" className="p-5 pt-1 shadow shadow-gray-400 max-w-[48rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="flex items-center gap-2 pt-0 pb-2 mx-0 border-b-2 border-gray-200 rounded-none"
      >
        <Avatar
          size="sm"
          variant="circular"
          src={user.avatar}
          alt={user}
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div>
              <Typography className="w-32 text-black lg:w-48" variant="h6">
                {user.name}
              </Typography>
            </div>
            <div className="flex items-center gap-2 ">
              <FaRegClock />
              <p className="text-xs">{postedAt(createdAt)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0 pt-4 mb-8">
        <div className="w-fit" onClick={onThreadClick} role="button" tabIndex={0} onKeyDown={onThreadPress}>
          <Typography className="mb-2 text-xl font-semibold text-gray-900 " dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="text-justify line-clamp-5">
          <Typography variant="paragraph" dangerouslySetInnerHTML={{ __html: body }} className="font-normal leading-[25px] text-grey-700" />
        </div>
      </CardBody>
      <CardFooter className="flex justify-between p-0">
        <div>
          <Button className="px-3 py-1 font-normal lowercase border rounded-full shadow-none cursor-default bg-bussYellow hover:shadow-none border-mustardYellow text-yankeesBlue" size="sm" ripple={false}>
            #
            {category}
          </Button>
        </div>
        <div className="flex items-center gap-3">
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
              <p className={`text-xs ${isUpVoted ? 'font-bold text-black' : ''}`}>{upVotesBy.length}</p>
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
              <p className={`text-xs ${isDownVoted ? 'font-bold text-black' : ''}`}>{downVotesBy.length}</p>
            </button>
          </Tooltip>
          <button type="button" className="flex items-center gap-1" onClick={onThreadClick} onKeyDown={onThreadPress}>
            <TbMessages />
            <p className="text-xs">{totalComments}</p>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  handleUpVote: PropTypes.func,
  handleDownVote: PropTypes.func,
};

export { threadItemShape };
