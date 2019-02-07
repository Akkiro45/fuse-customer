import React from 'react';

const space = (props) => {
  let style = {
    width: '100%',
    height: '20px'
  }
  if(props.height) style.height = props.height;
  return (
    <div style={style} className={module.Space} ></div>
  );
}

export default space;