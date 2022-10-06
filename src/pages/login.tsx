import React, { Component } from 'react'
import '../css/login.css'
import { DatePicker } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios'
import {FormInstance} from "antd/es/form/Form" //引入类型



export default class login extends Component {
    formRef = React.createRef<FormInstance>()//创建ref对象
    denglu(){
        let data = this.formRef.current?.getFieldsValue()
        axios.post('http://8.210.89.197:1102/login',data)
        .then(res=>{
          console.log(res.data);
          
            if (res.data.code === 200) {
              console.log(1);
              
                window.open('http://localhost:3000/#/home')
                
            }

        })
    }
    

  render() {
    return (
    <Form
    ref={this.formRef}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ username: '',pwd:'' }}
      autoComplete="off"
    >
    <div className='box'>
    <p className='biaoti'>用户管理</p>
    <Form.Item
    className='zh'
        label="账号"
        name="username"
        rules={[{ required: true, message: '请输入账号!' }]}
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        className='mm'
        label="密码"
        name="pwd"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>

      

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={()=>this.denglu()}>
          登录
        </Button>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </div>
    </Form>
        
    //   <>
    //     <div id='bj'>
    //         <div className='box'>
    //             <p className='biaoti'>用户管理</p>
    //             <div><input className='zh' type="text" placeholder='账号'/></div>
    //             <div><input className='mm' type="text" placeholder='密码'/></div>
    //             <button className='dl'>注册</button>
    //             <button className='zc'>登录</button>
    //         </div>
                
                
            
    //     </div>
    //   </>
    )
  }
}




