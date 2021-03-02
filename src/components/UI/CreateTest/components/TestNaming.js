import React from 'react';

import classes from './TestNaming.module.css'

const TestNaming = (props) => {
  return (
    <div className={classes.TestNaming}>
      <input
        type="text"
        placeholder="Test name"
        onChange={props.changeTestNameValue}
      />

      <textarea 
        type="text"
        placeholder="Description"
        onChange={props.changeTestDescriptionValue}
      />
    </div>
  );
};

export default TestNaming;
