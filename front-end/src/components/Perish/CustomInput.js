import React from 'react';
import { Input } from 'antd';
import styles from './CustomInput.css';

class CustomInput extends React.Component {
  render() {
    const { defaultValue } = this.props;
    return (
      <input
        className={styles.container}
        defaultValue={defaultValue}
        onKeyPress={this.keyPressHandler}
        onBlur={this.blurHandler}
        ref={ref => (this.input = ref)}
      />
    );
  }

  keyPressHandler = e => {
    if (e.key === 'Enter') {
      document.activeElement.blur();
    }
  };

  blurHandler = _ => {
    this.props.onChange(this.input.value);
  };
}

export default CustomInput;
