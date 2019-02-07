import React from 'react';

import Spinner from '../Spinner/Spinner';
import module from './SpinnerCenter.module.css';

const spinnerCenter = () => {
  return (
    <div className={module.Spinner} >
      <Spinner />
    </div>
  );
}

export default spinnerCenter;