import React from 'react';
import { MdDirectionsRun } from 'react-icons/md';

import classes from './DeliveryRun.module.css';

const DeliveryRun = () => {
    return (
        <div className={classes.change}>
            <MdDirectionsRun />
        </div>
    );
}

export default DeliveryRun;