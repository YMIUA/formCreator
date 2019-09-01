import React from 'react';
import { connect } from 'react-redux'

function App(store) {
  return (
    <p>{JSON.stringify(store)}</p>
  );
}

export default connect((store)=>{return store})(App);
