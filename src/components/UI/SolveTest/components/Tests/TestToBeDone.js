import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import 'alertifyjs/build/css/alertify.css';
import * as alertify from 'alertifyjs';
import TestComponent from './TestComponent';
import ButtonSubmit from './ButtonSubmit';

const TestToBeDone = () => {
  const [myTest, setMyTest] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const history = useHistory();

  const params = useParams();
  const url = `https://react-hookks-default-rtdb.firebaseio.com/tests/${params.id}.json`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        const loadedTest = {
          testName: responseData.title,
          testDescription: responseData.description,
          questionElement: responseData.questionElement,
        };
        setMyTest(loadedTest);
        setUserAnswers(responseData.questionElement);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    let answersNotProvided = userAnswers.some(
      (element) => !element.hasOwnProperty('userAnswer')
    );

    let score = 0;
    userAnswers.forEach((element) => {
      if (element.isTrue === element.userAnswer) {
        score++;
      }
    });

    if (answersNotProvided) {
      alertify.error('You need to provide all the answers!');
    } else {
      alertify.alert(
        'Test done. Your score is: ' + score + '. Click OK to go back',
        function () {
          history.push('/solveTest');
        }
      ).set({title:"Finish"});
    }
  };

  const handleChangeSelect = (index, event) => {
    setUserAnswers(
      [...userAnswers],
      (userAnswers[index].userAnswer = event.target.value)
    );
  };
  return (
    <div>
      <TestComponent
        testName={myTest.testName}
        testDescription={myTest.testDescription}
        questions={
          myTest.questionElement &&
          myTest.questionElement.map((item) => {
            return (
              <li key={item.id}>
                <p>{item.question}</p>

                <select
                  name="Answers"
                  defaultValue="def"
                  onChange={(event) => handleChangeSelect(item.id, event)}
                >
                  <option disabled value="def">
                    -- select answer --
                  </option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </li>
            );
          })
        }
      />
      <ButtonSubmit clicked={handleSubmit} />
    </div>
  );
};

export default TestToBeDone;
