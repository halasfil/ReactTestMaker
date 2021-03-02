import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <header className={classes.MainHeader}>
      <nav>
        <ul>
          <li>
            <NavLink to="/createTest">
              Create test
            </NavLink>
          </li>
          <li>
            <NavLink to="/solveTest">Solve test</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
