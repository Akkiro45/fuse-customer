import React from 'react';
import { FaEdit } from 'react-icons/fa';

import classes from './Edit.module.css';

const edit = (props) => {
    return (
        <div className={classes.change} onClick={props.onClick} >
            <FaEdit />
        </div>
    );
}

export default edit;