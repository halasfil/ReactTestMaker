import React from 'react';
import classes from './TestList.module.css'

const TestsList = (props) => {
  return (
    <div className={classes.TestList}>
      <h2>Available tests:</h2>
      <ul>
        {props.tests.map((tst) => (
          <li key={tst.id} 
          onClick={props.click.bind(this, tst.id)}>
            <h3>{tst.testName}</h3>
            <p>{tst.testDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestsList;
