import React from 'react'
import {Pin} from "lucide-react";

const NoteCard = (props) => {

  return (
    <div className='note-card'>
        <span className='pin-it'><Pin size={16} /></span>
        <h3 className='note-title'>{props.note.title}</h3>
        <p className='note-content'>{props.note.content}</p>
    </div>
  )
}

export default NoteCard