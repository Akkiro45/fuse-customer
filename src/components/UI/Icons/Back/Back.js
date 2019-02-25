import React from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';

import classes from './Back.module.css';

const Back = (props) => {
    return (
        <div className={classes.change} onClick={props.onClick} >
            <FaChevronCircleLeft />
        </div>
    );
}

export default Back;