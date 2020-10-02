import React from 'react'
import { Link } from 'react-router-dom'
import './Folder.css'
import MyContext from './MyContext'
import PropTypes from 'prop-types'

class Folder extends React.Component {
    static contextType = MyContext
    render() {
        const notesList = this.context.notes.map(note => note)

        return (
            
            <div className="notes-list">
                {
                    
                    notesList.map((n, idx) =>
                    (n.folderId === this.props.match.params.folderId) 
                    ? <div className="note" key={idx}>
                    <Link to={`/note/${n.id}`}><h4>{n.name}</h4></Link>
                    <button data-nodeid={n.id} value={n.id} onClick={event => this.context.deleteHandler(event)}>Delete Note</button>
                    </div>
                    : ""
                    )
                }
            </div>
            
        )
    }
}


Folder.propTypes = {
    props: PropTypes.object
} 

export default Folder