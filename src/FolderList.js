import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './FolderList.css'
import MyContext from './MyContext'
import AddFolder from './AddFolder'
import AddNote from './AddNote'

class FolderList extends React.Component {
    static contextType = MyContext; 
    
    /*
    displayFolderForm = () => {
        console.log('folder form button is working')
        ReactDOM.render(<AddFolder/>, document.getElementById('folderForm'))
    }
    */

    render() {
        return (
        <div className="folder-list">
            {this.context.folders.map((f, idx) => {
            return <div className="folder" key={idx} folderid={f.id}>
                    <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                </div>
            })}
            <AddFolder />
            <AddNote/>
        </div>
        )
    }
} 


/*

<button type="button" onClick={this.displayFolderForm}>Add Folder</button>
<div id="folderForm"></div>

function FolderList(props) {
    function displayFolderForm() {
        return <div>
            <AddFolder/>
        </div>
    }

    return (
            <MyContext.Consumer>
                {
                    (context) => {
                        return (
                            <div className="folder-list">
                            {context.folders.map((f, idx) => {
                            return <div className="folder" key={idx} folderid={f.id}>
                                    <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                                </div>
                            })}
                            <button type="button" onClick={displayFolderForm()}>Add Folder</button>
                        </div>
                        )
                    }
                }
                
                
            </MyContext.Consumer>
            
    )
} */

export default FolderList