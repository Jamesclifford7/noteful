import React from 'react'
import { Link } from 'react-router-dom'
import './FolderList.css'
import MyContext from '../MyContext/MyContext'


class FolderList extends React.Component {
    static contextType = MyContext; 

    render() {
        return (
            <div className="folder-list">
                {this.context.folders.map((f, idx) => {
                return <div className="folder" key={idx} folderid={f.id}>
                        <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                    </div>
                })}
                <div className="add-buttons"> 
                    <Link to="/addfolder"><button type="button">Add Folder</button></Link> 
                    <Link to="/addnote"><button type="button">Add Note</button></Link>
                </div>
            </div>
        )
    }
} 


/*

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