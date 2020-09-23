import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Main from './Main'
import Folder from './Folder'
import Note from './Note'
import STORE from './STORE'
import Header from './Header'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header folders={STORE.folders} />
        <Route exact path='/' 
        render={(props) => (
          <Main {...props} folders={STORE.folders} notes={STORE.notes} />
        )} />
        <Route path='/folder/:folderId'
        render={(props) => (
          <Folder {...props} folders={STORE.folders} notes={STORE.notes} />
        )} />
        <Route path='/note/:noteId' 
        render={(props) => (
          <Note {...props} folders={STORE.folders} notes={STORE.notes} />
        )} />
      </div>
    );
  }
}

export default App;


