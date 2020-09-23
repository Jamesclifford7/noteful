import React from 'react'
import { Link } from 'react-router-dom'

class Main extends React.Component {
    render() {
        const fullNotesList = this.props.notes.map((n, idx) => {
            return <div className="note" key={idx}>
            <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
            <button>Delete Note</button>
            </div>

        })

        return (
            <div className="main-page">
                <div className="note-display">
                    {fullNotesList}
                </div>
            </div>
        )
    }
}

export default Main



