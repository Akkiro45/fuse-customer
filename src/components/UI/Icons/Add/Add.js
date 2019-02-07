import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

import classes from './Add.module.css';

const add = (props) => {
    return (
        <div className={classes.change} onClick={props.onClick} >
            <IoMdAddCircleOutline />
        </div>
    );
}

export default add;