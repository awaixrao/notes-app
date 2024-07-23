import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal, Button } from 'antd';
import NoteForm from "../NoteForm/NoteForm";


const NewNote = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');



 

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


  return (
    <>
      <Modal
        title="Create New Note"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >

        <NoteForm setOpen={setOpen} />
      </Modal>
      <div className="newNoteBtn" onClick={() => setOpen(true)}>
        <Plus color="red" size={26} />
      </div>
    </>

  )
}

export default NewNote