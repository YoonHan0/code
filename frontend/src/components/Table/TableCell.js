import React from 'react';

const TableCell = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    padding:'10px',
    // border: '1px solid #000',
  });
  return (
    <td 
      style={updatedStyle}
      colspan="10">
      {children}
    </td>
  );
};

export default TableCell;