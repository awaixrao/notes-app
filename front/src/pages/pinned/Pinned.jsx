import React, { useContext, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import NewNote from '../../components/NewNote/NewNote'
import Topbar from '../../components/Topbar/Topbar'
import Notes from '../../components/Notes/Notes'
import { AuthContext } from '../../context/AuthContext'



const Pinned = () => {
    const ctx = useContext(AuthContext);

    useEffect( () => {
        ctx.getUserNotes('isPinned');
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <div className='main'>
                <Topbar />
                <div className='pines mt-10'>
                    <h3 className='text-2xl'>Pinned Notes</h3>
                    <Notes />
                </div>
            </div>
            <NewNote />
        </div>
    )
}

export default Pinned