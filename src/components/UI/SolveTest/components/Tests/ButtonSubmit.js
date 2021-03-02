import React from 'react';
import classes from './ButtonSubmit.module.css';

const TestComponent = (props) => {
  return (
    <div className={classes.Submit}>
      <button onClick={props.clicked}>Check your answers</button>
    </div>
  );
};

export default TestComponent;
