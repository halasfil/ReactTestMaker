import React from 'react';
import classes from './TestComponent.module.css'

const TestComponent = (props) => {
  return (
    <div className={classes.TestComponent}>
      <h2>{props.testName}</h2>
      <h3> {props.testDescription}</h3>
      <ul>
          {props.questions}
      </ul>
    </div>
  );
};

export default TestComponent;
