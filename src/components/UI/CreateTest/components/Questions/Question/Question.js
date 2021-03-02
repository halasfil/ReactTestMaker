import React from 'react';

import classes from './Question.module.css'

const Question = (props) => {
  return (
    <div className={classes.Question}>
      <textarea
        name={props.inputName}
        type="text"
        placeholder="Question"
        value={props.questionValue}
        onChange={props.changeQuestionValue}
      />
      <label htmlFor="Answers">Correct answer: </label>
      <select name="Answers" defaultValue="def" onChange={props.change}>
        <option disabled value="def"> -- select -- </option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </div>
  );
};

export default Question;
