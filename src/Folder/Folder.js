import React from 'react'
import { Link } from 'react-router-dom'
import './Folder.css'
import MyContext from '../MyContext/MyContext'
import PropTypes from 'prop-types'
import FolderList from '../FolderList/FolderList'

class Folder extends React.Component {
    static contextType = MyContext
    render() {
        const notesList = this.context.notes.map(note => note); 
        const currentFolderId = parseInt(this.props.match.params.folderId);
        const found = this.context.folders.find(folder => folder.id === currentFolderId);
        if (found) {
            return (
                <div className="container">
                    <FolderList />
                    <div className="notes-list">
                        
                        {
                            notesList.map((n, idx) =>
                            (n.folderid === parseInt(this.props.match.params.folderId))
                            ? <div className="note" key={idx}>
                            <Link to={`/note/${n.id}`}><h4>{n.title}</h4></Link>
                            <button data-nodeid={n.id} value={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button>
                            </div>
                            : ""
                            )
                        }
                    </div>
                </div>
                
            )
        } else {
            throw new Error('this folder does not exist')
        }
        
    }
}


Folder.propTypes = {
    folderId: PropTypes.string
} 

export default Folder