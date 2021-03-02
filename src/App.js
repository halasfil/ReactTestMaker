import './App.css';
import { Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import DefaultPage from './components/UI/Default/Default';
import SolveTest from './components/UI/SolveTest/SolveTest';
import CreateTest from './components/UI/CreateTest/CreateTest';
import TestToBeDone from './components/UI/SolveTest/components/Tests/TestToBeDone'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Route path="/" component={DefaultPage} exact/>
        <Route path="/createTest" component={CreateTest} />
        <Route path="/solveTest" component={SolveTest} exact/>
        <Route exact path="/solveTest/:id" component={TestToBeDone} />

      </main>
    </>
  );
}

export default App;
