import React from 'react';
import { MdExpandLess } from 'react-icons/md';

import classes from './UpArrow.module.css';

const UpArrow = () => {
    return (
        <div className={classes.change}>
            <MdExpandLess />
        </div>
    );
}

export default UpArrow;