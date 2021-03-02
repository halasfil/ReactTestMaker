import React, { useState, useEffect } from 'react';
import TestsList from './components/Tests/TestsList';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const SolveTest = () => {
  const [myTests, setMyTests] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://react-hookks-default-rtdb.firebaseio.com/tests.json')
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);

        const loadedQuestions = [];
        for (const key in responseData) {
          loadedQuestions.push({
            id: key,
            testName: responseData[key].title,
            testDescription: responseData[key].description,
          });
        }
        setMyTests(loadedQuestions);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(true);
      });
  }, []);

  const openTestHandler = (ind) => {
    history.push('/solveTest/' + ind);
  };

  const handleCloseLoading = () => {
    setIsLoading(!isLoading);
  };

  if (!error) {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1 }}
          open={isLoading}
          onClick={handleCloseLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <TestsList tests={myTests} click={openTestHandler} />
      </div>
    );
  } else if (error) {
    return <h2>Error: something went wrong</h2>;
  }
};

export default SolveTest;
