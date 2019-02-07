import React from 'react';
import { MdLocalPhone } from 'react-icons/md';

import classes from './Contact.module.css';

const Contact = () => {
    return (
        <div className={classes.change}>
            <MdLocalPhone />
        </div>
    );
}

export default Contact;