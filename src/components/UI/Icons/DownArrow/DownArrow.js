import React from 'react';
import { MdExpandMore } from 'react-icons/md';

import classes from './DownArrow.module.css';

const DownArrow = () => {
    return (
        <div className={classes.change}>
            <MdExpandMore />
        </div>
    );
}

export default DownArrow;