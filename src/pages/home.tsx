import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
// import '../assets/css/home.css'
import 'antd/dist/antd.css'
import axios from 'axios';

function denglu(){
  alert('我修改了')
}
function del(){
  alert('我删除了')
}

interface DataType {
  key?: React.Key;
  userid: string;
  username: string;
  pwd: string;
  isadmin: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '用户ID',
    dataIndex: 'userid',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '密码',
    dataIndex: 'pwd',
  },
  {
    title: '权限',
    dataIndex: 'isadmin',
    render:(isadmin)=>(
      <>
      {isadmin===0?'普通用户':'管理员'}
      </>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render:()=>(
      <>
        <Button onClick={()=>denglu()}>修改</Button>
        <Button onClick={()=>del()}>删除</Button>
      </>
    )
  },
];



  
const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data,setdata]=useState<DataType[]>([]);
  const [page,setpage]=useState(1);
  const [sumpage,setsumpage]=useState(1);
  function getinfo(page:number=1,searchObj=undefined):void{
    axios.post('http://8.210.89.197:1102/userlist',{page,searchObj}).then(res=>{
      console.log(res.data.result);
      setsumpage(res.data.result)
      let a = (res.data.result.userlist).map((item:object,index:number) => {
        return item ={key:index,...item}
      });

      setdata(a)
    })
  }
  if(data[0]==undefined){
    getinfo()
  }
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
      getinfo()
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          重新加载
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} 
      pagination={{total:50,onChange:(e)=>{getinfo(e)}}}
      />
    </div>
  );
};

export default App;


