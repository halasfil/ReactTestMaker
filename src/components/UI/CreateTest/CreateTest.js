import React, { useState } from 'react';
import AddQuestionButton from './components/Buttons/AddQuestionButton';
import CreateTestButton from './components/Buttons/CreateTestButton';
import DeleteQuestionButton from './components/Buttons/DeleteQuestionButton';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import classes from './CreateTest.module.css';
import Question from './components/Questions/Question/Question';
import TestNaming from './components/TestNaming';
import 'alertifyjs/build/css/alertify.css';
import * as alertify from 'alertifyjs';

const CreateTest = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [questionElement, setQuestionElement] = useState([
    {
      id: 0,
      question: '',
      isTrue: '',
    },
  ]);

  const [title, setTitle] = useState({
    testName: '',
  });
  const [description, setDescription] = useState({
    testDescription: '',
  });

  const addQuestionHandler = (index) => {
    setQuestionElement([
      ...questionElement,
      {
        id: index,
        question: '',
        isTrue: '',
      },
    ]);
  };

  const deleteHandler = (index) => {
    if (questionElement.length > 1)
      setQuestionElement(questionElement.filter((item) => item.id !== index));
  };

  const handleChangeQuestionInput = (index, event) => {
    const values = [...questionElement];
    values[index][event.target.name] = event.target.value;
    setQuestionElement(values);
  };

  const handleChangeSelect = (index, event) => {
    setQuestionElement(
      [...questionElement],
      (questionElement[index].isTrue = event.target.value)
    );
  };

  const createTestHandler = () => {
    if (
      title === '' ||
      description === '' ||
      questionElement.find((el) => el.question === '' || el.isTrue === '')
    ) {
      alertify.error('Fill in all the fields');
    } else {
      alertify.confirm('Submit your test?', function(){submitTest()}, function () {
        alertify.warning('Cancel');
      });
    }
  };

  const submitTest = () => {
    const myTest = {
      title,
      description,
      questionElement,
    };
    setIsLoading(true);
    fetch('https://react-hookks-default-rtdb.firebaseio.com/tests.json', {
      method: 'POST',
      body: JSON.stringify(myTest),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .catch((error) => {
        alertify.error('Error occured.');
        setIsLoading(false);
        console.error('Error:', error);
      })
      .then(() => {
        alertify.success('Submited');
        history.push('/');
      });
  };

  const handleCloseLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className={classes.CreateTest}>
      <Backdrop
        style={{ zIndex: 1 }}
        open={isLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TestNaming
        changeTestNameValue={(event) => setTitle(event.target.value)}
        changeTestDescriptionValue={(event) =>
          setDescription(event.target.value)
        }
      />
      {questionElement.map((questionElement, index) => (
        <div key={index}>
          <Question
            inputName="question"
            questionValue={questionElement.question}
            changeQuestionValue={(event) =>
              handleChangeQuestionInput(questionElement.id, event)
            }
            //for selected options
            change={(event) => handleChangeSelect(questionElement.id, event)}
          />
        </div>
      ))}
      <div>
        <AddQuestionButton
          clicked={() => addQuestionHandler(questionElement.length)}
        />
        <DeleteQuestionButton
          clicked={() => deleteHandler(questionElement.length - 1)}
        />
      </div>

      <CreateTestButton clicked={createTestHandler} />
    </div>
  );
};

export default CreateTest;
