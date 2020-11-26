import React from 'react'
import MyContext from '../MyContext/MyContext'
import './AddNote.css'
import { Link } from 'react-router-dom'

class AddNote extends React.Component {
    static contextType = MyContext

    render() {
        const fullNotesList = this.context.notes.map((n, idx) => {
            return <div className="note" key={idx}>
            <Link to={`/note/${n.id}`}><h4>{n.title}</h4></Link>
            <button type='button' value={n.id} data-nodeid={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button>
            </div> 
        }) 

        return (
            <div className="container">
                <div className="folder-list">
                    {this.context.folders.map((f, idx) => {
                        return <div className="folder" key={idx} folderid={f.id}>
                                <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                            </div>
                    })}
                    <form onSubmit={event => this.context.addNoteHandler(event)}>
                        <label htmlFor="newNoteName">Add Note: </label>
                        <input 
                        id="newNoteName"
                        type="text"/>
                        <span>Content:</span>
                        <textarea id="content" /><br/>
                        <span>To Folder: </span>
                        <select id="folderSelect">
                            {
                                this.context.folders.map((folder, id) => {
                                return <option key={id} value={folder.id} >{folder.name}</option>
                                })
                            }
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="note-display">
                    {fullNotesList}
                </div>
            </div>
        )
    }
}

export default AddNote