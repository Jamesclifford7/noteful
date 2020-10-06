import React from 'react'

const MyContext = React.createContext({ 
    folders: [], 
    notes: [],
    deleteHandler: () => {}, 
    addFolderHandler: () => {}, 
    addNoteHandler: () => {}
}); 

export default MyContext