import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import ErrorImg from '../assets/images/Error404.svg';

export default function Error404() {
  return (
    <div className="flex flex-col items-center px-8 mx-auto mt-20 text-center">
      <img src={ErrorImg} alt="error" className="w-96" />
      <Typography
        variant="h1"
        color="blue-gray"
        className=" !text-3xl !leading-snug md:!text-4xl"
      >
        It looks like something went wrong.
      </Typography>
      <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
        Don&apos;t worry, our team is already on it.Please try refreshing
        the page or come back later.
      </Typography>
      <Link to="/">
        <Button color="gray" className="w-full px-4 md:w-[8rem]">
          back home
        </Button>
      </Link>
    </div>
  );
}
