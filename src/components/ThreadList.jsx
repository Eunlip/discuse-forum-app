import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './Card/ThreadItem';

export default function ThreadList({ threads, upVote, downVote }) {
  return threads?.map((thread) => (
    <ThreadItem
      key={thread.id}
      {...thread}
      handleUpVote={upVote}
      handleDownVote={downVote}
    />
  ));
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};
