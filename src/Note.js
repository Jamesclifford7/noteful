import React from 'react'
import { Link } from 'react-router-dom'


class Note extends React.Component {
    render() {
        const notesList = this.props.notes.map(note => note)   
        // console.log(this.props)     
        // console.log(notesList)

        return (
            <div> 
                {
                    notesList.map((n, idx) => 
                        (n.id === this.props.match.params.noteId)
                        ? <div className="note" key={idx}>
                        <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
                        <p>{n.content}</p>
                        <button>Delete Note</button>
                        </div>
                        : ""
                    )
                }
            </div>
        )
    }
}

export default Note
