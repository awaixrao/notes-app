import { Button, Checkbox, Form, Input, Modal } from 'antd';
import {httpClient} from '../../lib/httpClient';
import { useState } from 'react';
const { TextArea } = Input;


const NoteForm = (props) => {
    const [loading, setLoading] = useState(false);


    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        httpClient.post("/new-note", values).then( (res) => {
            console.log("res");
            
        }).catch( () => {

        }).finally( () => {setLoading(false); props.setOpen(false); })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
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
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Description is required!',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
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