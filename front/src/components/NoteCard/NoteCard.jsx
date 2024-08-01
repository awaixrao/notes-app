import React, { useContext, useState } from 'react'
import { Pin, EllipsisVertical, Trash, FilePenLine, Archive } from "lucide-react";
import { Dropdown, Space, Button, Modal } from 'antd';

import { httpClient } from "../../lib/httpClient";
import { AuthContext } from '../../context/AuthContext';


const NoteCard = (props) => {
  const ctx = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [actionMsg, setActionMsg] = useState(false);


  const showModal = (id) => {
    setNoteId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {

    httpClient.delete(`/notes/${noteId}`).then(res => {
      if (res.data.errors == false) {
        setActionMsg("successfully deleted");
      } else {
        setActionMsg("something went wrong");
      }
    }).catch(err => {
      console.log(err.message)
    }).finally(() => {
      setTimeout(() => {
        setIsModalOpen(false);
        ctx.getUserNotes();
      }, 1000)
    })

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handlePin = (id, value) => {
    httpClient.put(`/notes/pinned/${id}`, {
      "isPinned": value
    }).then(res => {
      if (res.data.errors == false) {
        if (value == false) {
          ctx.getUserNotes('isPinned');
        } else if (value == true) {
          ctx.getUserNotes();
        }
      }
    }).catch((err) => {
      console.log(err.message)
    }).finally(() => {

    })
  }


  const handleArchive = (id) => {
    alert(id);
  }

  const handleEdit = (id) => {

  }

  const handleDelete = (id) => {

  }

  const items = [
    {
      label: (props.note.isPinned == true) ? <a onClick={() => handlePin(props.note._id, false)}><Pin size={15} className='flex gap-3' /> <span>Unpin</span></a> : <a onClick={() => handlePin(props.note._id, true)}><Pin size={15} className='flex gap-3' /> <span>Pin</span></a>,
      key: '0',
    },
    {
      label: <a onClick={() => handleArchive(props.note._id)} ><Archive size={15} className='flex gap-3' /> <span>Archive</span></a>,
      key: '1',
    },
    {
      label: <a onClick={() => handleEdit(props.note._id)}><FilePenLine size={15} className='flex gap-3' /> <span>Edit</span></a>,
      key: '2',
    },
    {
      label: <a onClick={() => showModal(props.note._id)}><Trash size={15} className='flex gap-3' /> <span>Delete</span></a>,
      key: '3',
    },

  ];


  return (
    <>
      <div className='note-card'>
        <Dropdown
          menu={{
            items
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()} className='pin-it'>
            <div>
              <EllipsisVertical size={18} />
            </div>
          </a>

        </Dropdown>
    
        <h3 className='note-title'>{props.note.title}</h3>
        <p className='note-content'>{props.note.content}</p>
      </div>
      <Modal title="Delete Note" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {
          actionMsg && <p className='px-3 py-3 bg-blue-300'>{actionMsg}</p>
        }
        Are you sure you want to delete this note?
      </Modal>

    </>


  )
}

export default NoteCard