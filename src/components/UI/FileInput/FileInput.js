import React, { Component } from 'react';

import Button from '../RButton/Button';
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
        <div style={this.props.style} >
          <Button onClick={() => this.fileInput.click()} >Pick Photo</Button>
        </div>
      </Aux>
    );
  }
}

export default FileInput;