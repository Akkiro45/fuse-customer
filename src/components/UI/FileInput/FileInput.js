import React, { Component } from 'react';

import Button from '../FormButton/Button';
import Aux from '../../../hoc/Auxx/Auxx';

class FileInput extends Component {
  render() {
    return (
      <Aux>
        <input 
          style={{ display: 'none' }}
          type='file'
          onChange={this.props.onChange}
          accept='image/jpeg, image/png'
          ref={fileInput => this.fileInput = fileInput}
        />
        <Button width='120px' onClick={() => this.fileInput.click()} >Pick File</Button>
      </Aux>
    );
  }
}

export default FileInput;