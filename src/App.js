import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import Main from './Main'
import Folder from './Folder'
import Note from './Note'
import FolderList from './FolderList'
import MyContext from './MyContext'
import uuid from 'react-uuid'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      folders: [], 
      notes: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error
        }
      })
      .then(resJsonFolders => this.setState({
        folders: resJsonFolders
      }))
      .catch(error => console.log(error + 'oops! something went wrong (folders)'));
      
      fetch('http://localhost:9090/notes')
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw new Error
          }
        })
        .then(resJsonNotes => this.setState({
            notes: resJsonNotes
        }))
        .catch(error => console.log(error + 'oops! something went wrong (notes)'));
  } 

  handleDelete = (event) => {
    // event.target.parentNode.remove()    
    let currentState = this.state.notes
    let indexToRemove = currentState.findIndex(note => {
      if (note.id === event.target.value) {
        return note
      }
    })
    console.log(indexToRemove)
    currentState.splice(indexToRemove, 1)
    this.setState({
      notes: currentState
    })
  }

  handleAddFolder = (event) => {
    event.preventDefault();
    console.log(event.target.newFolder.value);
    const newFolder = event.target.newFolder.value; 
    if (newFolder.length === 0) {
      alert('Please enter a folder name')
      // throw new Error('must enter a folder name')
    } else {
      this.setState({
        folders: [...this.state.folders, {id: uuid(), name: newFolder}]
      }) 
    }

    /*

    or:

    const currentFolders = this.state.folders

    this.setState({
      folders: currentFolders.push({id: uuid(), name: newFolder})
    })

    */

  }

  handleAddNote = (event) => {
    event.preventDefault();
    const { newNoteName, folderSelect, content } = event.target
    const newNote = {
      id: uuid(), 
      name: newNoteName.value, 
      folderId: folderSelect.value, 
      content: content.value
    }
    if (newNote.name.length === 0 || newNote.content.length === 0) {
      alert('Please enter a note name and content')
      // throw new Error('must enter a note name and content')
    } else {
      this.setState({
        notes: [...this.state.notes, newNote]
      })
    }
  }

  render() {
    const ContextData = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteHandler: this.handleDelete, 
      addFolderHandler: this.handleAddFolder, 
      addNoteHandler: this.handleAddNote
    }

    return (
      <MyContext.Provider value={ContextData}>
        <div className="App">
          <header><Link to='/'><h1>Noteful</h1></Link></header>
          <ErrorBoundary>
            <FolderList /> 
          </ErrorBoundary>   
          <Route exact path='/' 
          render={(props) => (
            <Main {...props} />
          )} />
          <Route path='/folder/:folderId'
          render={(props) => (
            <Folder {...props} />
          )} />
          <Route path='/note/:noteId' 
          render={(props) => (
            <Note {...props} />
          )} />
         
        </div>
      </MyContext.Provider>
    );
  }
}

export default App;

/* 

passing down props before using context:

<Route 
exact path='/' 
render={(props) => (
  <Main {...props} folders={this.state.data.folders} notes={this.state.data.notes} handleDelete={this.handleDelete} />
  )} 
/>

*/
