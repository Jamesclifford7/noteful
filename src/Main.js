import React from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import MyContext from './MyContext'

class Main extends React.Component {
    static contextType = MyContext
    render() {
        const fullNotesList = this.context.notes.map((n, idx) => {
            return <div className="note" key={idx}>
            <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
            <button type='button' value={n.id} data-nodeid={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button>
            </div>

        })

        return (
            <div className="note-display">
                {fullNotesList}
            </div>
        )
    }
}

export default Main