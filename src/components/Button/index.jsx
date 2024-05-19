import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';

export default function index({
  children, className, size, fullWidth, ripple, onClick, type,
}) {
  return (
    <Button
      className={`font-Poppins ${className}`}
      fullWidth={fullWidth}
      size={size}
      ripple={ripple}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
}

index.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  ripple: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
