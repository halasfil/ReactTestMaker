import React from 'react';
import classes from './ActionButtons.module.css'

const CreateTestButton = (props) => {
  return (
    <div className={classes.Create}>
     <button onClick = {props.clicked}>CreateTestButton</button>
    </div>
  );
};

export default CreateTestButton;
