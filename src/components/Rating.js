import React, { useState } from 'react';
import {  Rate } from 'antd';

const Rating = ({ratingValue}) => {
  return (
    <Rate allowHalf defaultValue={ratingValue} disabled/>
  );
};
export default Rating;