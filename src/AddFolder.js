import React from 'react'
import MyContext from './MyContext'
import './AddFolder.css'

class AddFolder extends React.Component {
    static contextType = MyContext
    render() {
        return (
            <form onSubmit={event => this.context.addFolderHandler(event)}>
                <label htmlFor="newFolder">Add New Folder:</label>
                <input 
                type="text"
                id="newFolder" 
                name="newFolder"
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default AddFolder