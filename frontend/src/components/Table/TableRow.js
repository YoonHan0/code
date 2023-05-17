import React from 'react';

const TableRow = ({ style, key, children }) => {

  const updatedStyle = Object.assign({}, style, { 
   });
  return (
      <tr style={style} key={key}>
        {children}
      </tr>
  );
};

export default TableRow;