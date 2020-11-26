import React from 'react';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import Main from './Main/Main'
import Folder from './Folder/Folder'
import Note from './Note/Note'
import AddNote from './AddNote/AddNote'
import MyContext from './MyContext/MyContext'
import AddFolder from './AddFolder/AddFolder'
// import uuid from 'react-uuid'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      folders: [], 
      notes: []
    }
  }

  componentDidMount() {
    // fetch('http://localhost:8000/api/folders/'
    fetch('https://cryptic-thicket-26447.herokuapp.com/api/folders/', {
      method: 'GET', 
    })
      .then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong retrieving data')
        }
      })
      .then(resJsonFolders => this.setState({
        folders: resJsonFolders.folders
      }))
      .catch(error => console.log(error + 'oops! something went wrong (folders)'));
    
    // fetch('http://localhost:8000/api/notes/'
    fetch('https://cryptic-thicket-26447.herokuapp.com/api/notes/', {
      method: 'GET', 
    })
      .then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong retrieving data')
        }
      })
      .then(resJsonNotes => this.setState({
          notes: resJsonNotes.notes
      }))
      .catch(error => console.log(error + 'oops! something went wrong (notes)')); 
  } 

  handleDelete = (event) => {
    // event.target.parentNode.remove() 
    let currentState = this.state.notes
    const noteId = event.target.value

    fetch(`https://cryptic-thicket-26447.herokuapp.com/api/notes/${noteId}`, {
      method: 'DELETE'
    })
    .then((res) => {
      console.log(res)
      let indexToRemove = currentState.findIndex(note => {
        if (note.id === parseInt(noteId)) {
          return note
        }
      })
      
      currentState.splice(indexToRemove, 1)
      this.setState({
      notes: currentState
      }) 
    }) 

  }

  handleAddFolder = (event) => {
    event.preventDefault();
    const newFolderName = event.target.newFolder.value; 
    console.log(newFolderName)
    
    if (newFolderName.length === 0) {
      alert('Please enter a folder name')
    } else {
      fetch('https://cryptic-thicket-26447.herokuapp.com/api/folders/', {
        method: 'POST', 
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "name": newFolderName
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        } throw new Error()
      })
      .then((response) => {
        this.setState({
          folders: [...this.state.folders, {name: newFolderName}]
        })
         
      }) 
    }
      /* 
      this.setState({
        folders: [...this.state.folders, {id: uuid(), name: newFolder}]
      });
      this.props.history.push("/");
    } 

    

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
      title: newNoteName.value,
      content: content.value, 
      folderid: folderSelect.value
    }
    const newNoteTitle = newNote.title
    const newNoteContent = newNote.content
    const newNoteFolderid = newNote.folderid
    if (newNote.title.length === 0 || newNote.content.length === 0) {
      alert('Please enter a note name and content')
    } else {
      fetch('https://cryptic-thicket-26447.herokuapp.com/api/notes/', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          "title": newNoteTitle, 
          "content": newNoteContent, 
          "folderid": newNoteFolderid
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        } throw new Error
      })
      .then((res) => {

        this.setState({
          notes: [...this.state.notes, newNote]
        })
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
          <Route 
          exact path='/' 
          render={(props) => (
            <Main {...props} />
          )} />
          <ErrorBoundary>
            <Route path='/folder/:folderId'
            render={(props) => (
              <Folder {...props} />
            )} />
          </ErrorBoundary>
          <Route
          path='/addfolder'
          render={
          (props) => (          
            <AddFolder {...props} />                
          )} />
          <Route 
          path='/addnote'
          render={
          (props) => (
            <AddNote {...props} />
          )} />
          <Route 
          path='/note/:noteId' 
          render={(props) => (
            <Note {...props} />
          )} />
        </div>
      </MyContext.Provider>
    );
  }
}

export default withRouter(App);

/* 

passing down props before using context:

<Route 
exact path='/' 
render={(props) => (
  <Main {...props} folders={this.state.data.folders} notes={this.state.data.notes} handleDelete={this.handleDelete} />
  )} 
/>

*/
