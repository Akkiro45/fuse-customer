import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    let style = {};
    let className = classes.Button;
    if(props.disabled) {
        style.cursor = 'not-allowed';
    }
    if(props.media) {
        className = classes.Button1;
    }
    return (
        <div className={className}>
            <button
                style={style}
                disabled={props.disabled}
                className={className}
                onClick={props.clicked}>{props.children}</button>
        </div>
    );
}

export default button;