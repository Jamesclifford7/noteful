import React from 'react'
import MyContext from './MyContext'
import './AddNote.css'

class AddNote extends React.Component {
    static contextType = MyContext
    render() {
        return (
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
        )
    }
}

export default AddNote