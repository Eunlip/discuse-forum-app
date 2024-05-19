import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchLeaderboards } from '../states/leaderboards/action';
import Ranking from '../components/Table/Ranking';

export default function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto mt-[68px] sm:mt-28">
        <Ranking leaderboards={leaderboards} />
      </div>
    </div>
  );
}
