import React from 'react';
import classes from './ActionButtons.module.css'

const DeleteQuestionButton = (props) => {
  return (
    <div className={classes.Delete}>
     <button onClick = {props.clicked}>Delete question</button>
    </div>
  );
};

export default DeleteQuestionButton;
