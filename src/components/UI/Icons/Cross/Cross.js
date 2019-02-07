import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';

import classes from './Cross.module.css';

const cross = (props) => {
    return (
        <div className={classes.change} onClick={props.onClick} >
            <FaRegTimesCircle  />
        </div>
    );
}

export default cross;