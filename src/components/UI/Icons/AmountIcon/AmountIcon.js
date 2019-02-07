import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';

import classes from './AmountIcon.module.css';

const AmountIcon = () => {
    return (
        <div className={classes.change}>
            <FaMoneyBillAlt />
        </div>
    );
}

export default AmountIcon;