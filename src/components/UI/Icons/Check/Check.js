import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

import classes from './Check.module.css';

const check = () => {
    return (
        <div className={classes.change}>
            <FaRegCheckCircle />
        </div>
    );
}

export default check;