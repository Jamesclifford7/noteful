import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
    const folderList = props.folders.map((f, idx) => {
        // console.log(f.id)
        return <div className="folder" key={idx} folderid={f.id}>
                    <Link to={`/folder/${f.id}`}><h3>{f.name}</h3></Link>
                </div>
        })

    return (
        <header>
            <h1>Noteful</h1>
            {folderList}
        </header>
    )
}

export default Header