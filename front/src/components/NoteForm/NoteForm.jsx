import { Button, Form, Input, Modal, notification, Space } from 'antd';
import {httpClient} from '../../lib/httpClient';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getToken } from '../../utilis';
import axios from 'axios';
const { TextArea } = Input;


const NoteForm = (props) => {
    const [loading, setLoading] = useState(false);
    const accessToken = getToken();
    const [api, contextHolder] = notification.useNotification();
    const ctx = useContext(AuthContext);


    // success notification
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Note Created',
            description:
                'Note created successfully.',
        });
    };

const onFinish = (values)=>{
    console.log("Success:", values );
setLoading(true)
httpClient.post("/notes/create", values, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((res) => {
        if(res.data.errors == false) {
            openNotificationWithIcon('success');
            setTimeout( () => {
                props.setOpen(false);
                ctx.getUserNotes();
            }, 5000)
        } else if(res.data.errors){
            alert("not created")
        }

        // 

    }).catch((err) => {
        if(err.response.status == 400) {
            ctx.logout();
        } 


    }).finally(() => {
        setLoading(false);
        //props.setOpen(false);
    })
}

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Note Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Note title is required!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Note body"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'content is required!',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="write your note"/>

                    
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={loading} >
                        Add Note
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NoteForm