import React from 'react'
import { Link } from 'react-router-dom'

class Folder extends React.Component {
    render() {
        /*
        const folderList = this.props.folders.map((f, idx) => {
            console.log(f.id)
            return <div className="folder" key={idx} folderid={f.id}>
                        <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                    </div>
            }) */
        const notesList = this.props.notes.map(note => note)
        // console.log(this.props)
        // console.log(notesList)

        return (
            <div>
            <div className="notes-list">
                
                {
                    notesList.map((n, idx) =>
                    (n.folderId === this.props.match.params.folderId) 
                    ? <div className="note" key={idx}>
                    <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
                    <button>Delete Note</button>
                    </div>
                    : ""
                    )
                }
            </div>
            </div>
        )
    }
}

export default Folder