import React from 'react';
import { Form } from 'react-bootstrap';
import InputControl from './components/InputControl';
import './App.css';

const App = () => {
  return (
    <div className="main">
      <h1>Search Feature Demo</h1>
      <div className="search-form">
        <Form>
          <InputControl
            name="country"
            label="Enter Country: "
            placeholder="Type a country name"
          />
        </Form>
      </div>
    </div>
  );
};

export default App;