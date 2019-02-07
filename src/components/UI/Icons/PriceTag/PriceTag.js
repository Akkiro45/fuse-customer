import React from 'react';
import { IoIosPricetag } from 'react-icons/io';

import classes from './PriceTag.module.css';

const PriceTag = () => {
    return (
        <div className={classes.change}>
            <IoIosPricetag />
        </div>
    );
}

export default PriceTag;