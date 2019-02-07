import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (props) => {
  return (
    <Modal 
      show={props.error}
      onclick={props.errorConformedhandler}
    >
      {props.error ?  props.error : null}
    </Modal>
  );
}

export default errorHandler;