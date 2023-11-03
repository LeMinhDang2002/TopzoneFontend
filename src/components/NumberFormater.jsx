import React from 'react';

function NumberFormatter(props) {
  const formattedNumber = props.number.toLocaleString('vi-VN'); // format number using Vietnamese locale
  return <p>{formattedNumber}đ</p>;
}

export default NumberFormatter;