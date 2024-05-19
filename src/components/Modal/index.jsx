import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { ThreadInput } from '../Input';

export default function Index({ createThread, isOpen, setIsOpen }) {
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <Button className="hidden sm:block bg-blue-gray-500 hover:shadow-none hover:bg-blue-gray-400" onClick={handleOpen}>+ New Topic</Button>
      <Dialog size="xl" open={isOpen} handler={handleOpen}>
        <Card className="w-full mx-auto shadow-none">
          <CardBody>
            <div className="flex items-center justify-between">
              <Typography className="text-lg font-semibold text-blue-gray-700">
                Create a New Thread
              </Typography>
              <IconButton
                color="blue-gray"
                size="sm"
                variant="text"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="my-5 h-[2px] bg-chineseWhite" />
            <ThreadInput createThread={createThread} />
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

Index.propTypes = {
  createThread: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
