import React from 'react';

import Spinner from '../Spinner/Spinner';
import module from './SpinnerPage.module.css';

const spinnerPage = () => {
  return (
    <div className={module.SP} >
      <div className={module.Spinner} >
        <Spinner />
      </div>
    </div>
  );
}

export default spinnerPage;