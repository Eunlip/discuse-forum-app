import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import {
  asyncDownVoteComment,
  asyncDownVoteDetail,
  asyncReceiveThreadDetail,
  asyncReplyComment,
  asyncUpVoteComment,
  asyncUpVoteDetail,
  clearThreadDetailActionCreator,
} from '../states/threadDetail/action';
import { ThreadReplyInput } from '../components/Input';
import Comment from '../components/Comment';
import Error404 from './Error404';

export default function DetailThreadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { threadDetail, authUser } = useSelector((state) => ({
    threadDetail: state.threadDetail || null,
    authUser: state.authUser,
  }));

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id, setIsLoading));
    return () => {
      dispatch(clearThreadDetailActionCreator());
      setIsLoading(true);
    };
  }, [id, dispatch]);

  const onReplyComment = ({ content }) => {
    dispatch(asyncReplyComment({ id, content }));
  };

  const onUpVote = () => {
    dispatch(asyncUpVoteDetail());
  };

  const onDownVote = () => {
    dispatch(asyncDownVoteDetail());
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId, authUser.id));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId, authUser.id));
  };

  if (!threadDetail && !isLoading) {
    return <Error404 />;
  }

  return (
    <section className="container mx-auto mt-16 mb-0 border-black sm:mb-5 lg:px-52 md:mt-20 lg:mt-28">
      {isLoading ? (
        <div className="text-4xl text-center mt-52">Loading...</div>
      ) : (
        <div className="container px-5 pt-5 pb-1 bg-white rounded-lg">
          <ThreadDetail
            {...threadDetail}
            authUser={authUser.id}
            upVote={onUpVote}
            downVote={onDownVote}
          />
          <div className="w-full h-[2px] mt-5 bg-blue-gray-50" />
          <Comment
            comments={threadDetail.comments || []}
            upVote={onUpVoteComment}
            downVote={onDownVoteComment}
            authUser={authUser.id}
          />
          <ThreadReplyInput replyComment={onReplyComment} />
        </div>
      )}
    </section>
  );
}
