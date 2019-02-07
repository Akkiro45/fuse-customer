import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

import classes from './ForwardArrow.module.css';

const ForwardArrow = () => {
    return (
        <div className={classes.change}>
            <FaAngleRight />
        </div>
    );
}

export default ForwardArrow;