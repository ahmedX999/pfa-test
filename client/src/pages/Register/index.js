import { Button, Form, Input, Radio, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import OrgHospitalForm from './OrgHospitalForm'
import { RegisterUser } from '../../apicalls/users'

function Register() {
    const [type, setType] = React.useState("donar");

    const onFinish = async (values) => {
        try {
           
            const response = await RegisterUser({
                ...values,
                userType:type,
            });
           
            if (response.success) {
                
                message.success(response.message);
            } else {
                
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className='flex h-screen items-center justify-center bg-primary'>

            <Form 
            layout="vertical" 
            className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2"
            onFinish={onFinish}
            >
                <h1 className='col-span-2'>
                    <span className='text-black uppercase text-2xl'>
                        {type.toUpperCase()} - REGISTRATION
                    </span>
                    <hr />
                </h1>

                <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
                    className='col-span-2'>
                    <Radio value="donar">Donar</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>



                {type === "donar" && ( <> 
                {" "}
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Phone' name='phone'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item></>
                    
                    )}

                {type !== "donar" && <OrgHospitalForm type={type} />
                }

                <Button type='primary' block className='col-span-2' htmlType='submit'>
                    Register
                </Button>

                <Link to="/login" className='col-span-2 text-center text-black underline '>
                    Already have an account? Login.
                </Link>
            </Form>

        </div>
    )
}

export default Register