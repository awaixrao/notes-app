import React, { useContext } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { AuthContext } from '../../context/AuthContext'


const Notes = () => {
    const ctx= useContext(AuthContext)
    const notes = [
        {
            id: 1,
            title: "edit nft landing page",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, distinctio.",
            bgColor: "#FFe54",
            isPinned: true,
            isDeleted: false,
        },
        {
            id: 2,
            title: "edit nft landing page",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, distinctio.",
            bgColor: "#FFe54",
            isPinned: false,
            isDeleted: false,
        },
        {
            id: 3,
            title: "edit nft landing page",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, distinctio.",
            bgColor: "#FFe54",
            isPinned: false,
            isDeleted: false,
        },
        {
            id: 4,
            title: "edit nft landing page",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, distinctio.",
            bgColor: "#FFe54",
            isPinned: false,
            isDeleted: true,
        } 
    ]
    return (
        <div className='notes'>
            <h5>My Notes ( {ctx.Notes.length} notes )</h5>
            <div className='notes-cards'>
                {
                  ctx.Notes.length > 0 &&  ctx.Notes.map((note, index) => {
                        return <NoteCard note={note} />
                    })
                }
            </div>

        </div>
    )
}

export default Notes