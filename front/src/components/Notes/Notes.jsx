import React from 'react'
import NoteCard from '../NoteCard/NoteCard'

const Notes = () => {
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
            <h5>All Notes ( 16 notes )</h5>
            <div className='notes-cards'>
                {
                    notes.map((note, index) => {
                        return <NoteCard note={note} />
                    })
                }
            </div>

        </div>
    )
}

export default Notes