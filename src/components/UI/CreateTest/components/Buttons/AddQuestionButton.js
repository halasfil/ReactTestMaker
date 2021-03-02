import React from 'react';
import classes from './ActionButtons.module.css'

const AddQuestionButton = (props) => {
  return (
    <div className={classes.Add}>
      <button onClick={props.clicked}> Add next question</button>
    </div>
  );
};

export default AddQuestionButton;
