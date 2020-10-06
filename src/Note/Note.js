import React from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../MyContext/MyContext'
import PropTypes from 'prop-types'


class Note extends React.Component {
    static contextType = MyContext
    render() {
        const notesList = this.context.notes.map(note => note)   
        return (
            <>
                {
                    notesList.map((n, idx) => 
                        (n.id === this.props.match.params.noteId)
                        ? <div className="note" key={idx}>
                        <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
                        <p>{n.content}</p>
                        <Link to={'/'}><button data-nodeid={n.id} value={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button></Link>
                        </div>
                        : ""
                    )
                }
            </>    
        )
    }
}

Note.propTypes = {
    noteId: PropTypes.string
}

export default Note