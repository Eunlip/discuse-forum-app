import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ search, onSearchChange }) {
  return (
    <div className="relative flex items-center justify-between h-12 my-4 lg:my-8 focus:bg-aliceBlue">
      <input
        className="w-full h-full py-3 text-lg font-medium border border-r-0 rounded-l-lg ps-5 focus:outline-none border-chineseWhite focus:shadow-inner placeholder:text-lg placeholder:font-normal text-yankeesBlue"
        type="text"
        placeholder="Search discussion..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="top-0 bg-white bottom-0 right-0 flex items-center justify-center h-full px-5 py-[13px] border border-chineseWhite rounded-r-lg border-l-0">
        <FiSearch />
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
