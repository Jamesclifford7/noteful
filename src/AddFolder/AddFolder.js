import React from 'react'
import MyContext from '../MyContext/MyContext'
import './AddFolder.css'
import { Link } from 'react-router-dom'

class AddFolder extends React.Component {
    static contextType = MyContext
    constructor(props) {
        super(props); 
        this.state = {
            newFolder: ""
        }
    }

    render() {
        
        const fullNotesList = this.context.notes.map((n, idx) => {
            return <div className="note" key={idx}>
            <Link to={`/note/${n.id}`}><h4>{n.title}</h4></Link>
            <button type='button' value={n.id} data-nodeid={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button>
            </div> 
        })  

        // console.log(this.props.history.push)

        return (
            <div className="container">
                <div className="folder-list">
                    {this.context.folders.map((f, idx) => {
                    return <div className="folder" key={idx} folderid={f.id}>
                            <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                        </div>
                    })}
                    <form onSubmit={event => this.context.addFolderHandler(event)}>
                        <label htmlFor="newFolder">Add New Folder:</label>
                        <input 
                        type="text"
                        id="newFolder" 
                        />
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

export default AddFolder