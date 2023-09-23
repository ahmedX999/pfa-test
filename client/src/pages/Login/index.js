import { Button, Form, Input, Radio } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  const [type, setType] = React.useState('donar')
  const onFinish = (values) => { console.log(values) }
  return (
    <div className='flex h-screen items-center justify-center bg-primary'>

      <Form layout="vertical" className="bg-white rounded shadow grid  p-5 gap-5 w-1/2" onFinish={onFinish}>
        <h1 className=''>
          <span className='text-black uppercase text-2xl'>
            {type.toUpperCase()} - LOGIN
          </span>
          <hr />
        </h1>

        <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
          className='L'>
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Orginization</Radio>
        </Radio.Group>



     
          <Form.Item label='Login' name='login'>
            <Input />
          </Form.Item>
          
          <Form.Item label='Password' name='password'>
            <Input type='password' />
          </Form.Item>

        <Button type='primary' block className='' htmlType='submit'>
          Login
        </Button>

        <Link to="/register" className=' text-center text-black underline '>
          Don't have an account? Register.
        </Link>
      </Form>

    </div>
  )
}

export default Login