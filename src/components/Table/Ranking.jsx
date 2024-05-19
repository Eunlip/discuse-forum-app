import React from 'react';
import { Card, Typography, Avatar } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import FirstPlace from '../../assets/images/1st-place.png';
import SecondPlace from '../../assets/images/2nd-place.png';
import ThirdPlace from '../../assets/images/3rd-place.png';

const TABLE_HEAD = ['Rank', 'Users', 'Score'];

const winnersBg = (rank) => {
  switch (rank) {
    case 1:
      return 'bg-[#FFED8B]';
    case 2:
      return 'bg-[#E0E0E0]';
    case 3:
      return 'bg-[#ECBAA3]';
    default:
      return '';
  }
};

const place = (rank) => {
  switch (rank) {
    case 1:
      return <img src={FirstPlace} className="w-10 mx-auto" alt="First Place" />;
    case 2:
      return <img src={SecondPlace} className="w-10 mx-auto" alt="Second Place" />;
    case 3:
      return <img src={ThirdPlace} className="w-10 mx-auto" alt="Third Place" />;
    default:
      return null;
  }
};

export default function Ranking({ leaderboards }) {
  return (
    <Card className="w-full h-full my-5 sm:my-10 ">
      <table className="w-full text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className={`p-4 border-b border-blue-gray-100 bg-blue-gray-50 ${head === 'Users' ? ' text-left' : ''}`}>
                <Typography variant="h5" color="blue-gray" className="font-normal">{head}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaderboards.map((leaderboard, i) => (
            <tr key={leaderboard.user.id} className={`border-b-2 ${winnersBg(i + 1)} ${[1, 2, 3].includes(i + 1) ? 'text-5xl' : 'text-base'}`}>
              <td className="px-auto">
                <Typography variant="h5" color="blue-gray" className="font-normal">
                  {place(i + 1) || i + 1}
                </Typography>
              </td>
              <td className="flex items-center gap-5 p-4 text-start">
                <Avatar src={leaderboard.user.avatar} alt={leaderboard.user.avatar} size="md" className="object-contain p-1 border border-blue-gray-50 bg-blue-gray-50/50" />
                <Typography variant="h5" color="blue-gray" className="font-normal">
                  {leaderboard.user.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="h5" color="blue-gray" className="font-normal">
                  {leaderboard.score}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Ranking.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape(userShape).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};
