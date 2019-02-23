import React, { Component } from 'react';
import { Breadcrumb,Input,Select,Button,Table,Divider,Modal,message } from 'antd';
import categoryStyle from './Category/category.less';
import * as common from '../util/common'; 
import { connect } from 'dva';

let initData={};

const namespace = 'category';
const mapStateToProps = (state) => {
  const categoryList = state[namespace].categoryList;
  const categoryInfo = state[namespace].categoryInfo;
  
  return {
    categoryList,
    categoryInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitTable`,
        payload:initData
      });
    },
    resetCategoryList: () => {
      dispatch({
        type: `${namespace}/saveList`,
        payload:{categoryList:[]}
      });
    },
    searchValue: (searchName,searchLevel,searchStatus) => {
      let searchData={};
      if(typeof searchName!=='undefined'){
          searchData.name=searchName;
      }
      if(typeof searchLevel!=='undefined'){
          searchData.level=searchLevel;
      }
      if(typeof searchStatus!=='undefined'){
          searchData.status=searchStatus;
      }
      dispatch({
        type: `${namespace}/queryInitTable`,
        payload:searchData
      });
    },
    getInfo:(id) =>{
        let getInfoData={
            id:parseInt(id)
        };
        dispatch({
          type: `${namespace}/getInfo`,
          payload:getInfoData
        });
    },
    modifySort:(id,sequence) =>{
        let modifySequenceData={
            id:parseInt(id),
            sequence:parseInt(sequence)
        };
        if(common.isNull(sequence)){
           message.error('类目排序不能为空');
        }else{
          dispatch({
            type: `${namespace}/modifySort`,
            payload:modifySequenceData
          });
        }
        
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HelloWorld extends Component {
  constructor(props) {
      super(props);
      // 设置 initial state
      this.state = {
        infoVisible: false,
        modifySortVisible:false,
        origin_sort:0,
      };
      this.nameChange = this.nameChange.bind(this);
      this.levelChange = this.levelChange.bind(this);
      this.statusChange = this.statusChange.bind(this);
      this.inputNewsort = this.inputNewsort.bind(this);
      document.title="锐竞平台管理系统";
  }
  componentWillMount(){
      let oms_cookie=document.cookie.indexOf("idOms=");
      if (oms_cookie==-1) {
          this.props.history.push('/user', null);
      }
  }
  componentDidMount() {
    this.props.onDidMount();
  }
  handleChange(value) {
      console.log(`selected ${value}`);
  }
  nameChange(event) {
    this.setState({searchName: event.target.value});
  }
  levelChange(value) {
    this.setState({level: parseInt(value)});
  }
  statusChange(value) {
    this.setState({status: parseInt(value)});
  }
  inputNewsort(event) {
    this.setState({newsort: event.target.value});
  }
  searchValue = () => {
    let searchName=this.state.searchName;
    let searchLevel=this.state.level;
    let searchStatus=this.state.status;
    this.props.resetCategoryList();
    this.props.searchValue(searchName,searchLevel,searchStatus);
  }
  resetValue = () => {
    this.setState({
      searchName:undefined,
      level:undefined,
      status:undefined
    });
    window.location.reload();
  }

  showModal = () => {
    this.setState({
      infoVisible: true,
    });
  }
  showSortModal = (id,sequence) => {
    this.setState({
        modifySortVisible:true,
        origin_sort:sequence,
        sort_id:id
    });
  }
  infoClose = (e) => {
    this.setState({
      infoVisible: false,
      modifySortVisible:false
    });
  }
  getInfo = (id) => {
      this.props.getInfo(id);
      this.showModal();
  }
  modifySort = () => {
      this.props.modifySort(this.state.sort_id,this.state.newsort);
      this.infoClose();
      this.props.onDidMount();
  }
  translevel = (level) => {
      let newlevel=parseInt(level);
      switch(newlevel){
        case 1:return '一级类目';
        case 2:return '二级类目';
        case 3:return '三级类目';
      } 
  }
  transtatus = (status) => {
      let newstatus=parseInt(status);
      switch(newstatus){
        case 1:return '禁用';
        case 2:return '启用';
      } 
  }
  render(){
      const { categoryList,categoryInfo,updateInfo } = this.props;
      const Option = Select.Option;
      let columns = [{
            title: '类目名称',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
          },{
            title: '类目编号',
            dataIndex: 'id',
            key: 'id',
            width: '15%'
          }, {
            title: '类目归属',
            dataIndex: 'level',
            width: '10%',
            key: 'level',
            render: (text,record) => {
              return (
                  <div>
                      { text == 1 && '一级类目'}
                      { text == 2 && '二级类目'}
                      { text == 3 && '三级类目'}
                  </div>
              )
            }
          }, {
            title: '排序',
            dataIndex: 'sequence',
            width: '10%',
            key: 'sequence',
          }, {
            title: '创建日期',
            dataIndex: 'createTime',
            width: '15%',
            key: 'createTime',
            render: (text, record) => (
                <span>
                    {common.convertTime(text)}
                </span>
            )
          }, {
            title: '状态',
            dataIndex: 'status',
            width: '10%',
            key: 'status',
            render: (text, record) => (
                <span>
                    {text == 2 ? '启用': '禁用'}
                </span>
            )
          }, {
            title: '操作',
            dataIndex: 'category_operate',
            width: '15%',
            key: 'category_operate',
            render: (text, record) => {
              return (
                  <div>
                      <a onClick={() => this.getInfo(record.id)} className={categoryStyle.catelink}>查看</a>
                      <a onClick={() => this.showSortModal(record.id,record.sequence)}>排序</a>
                  </div>
              )
            }
          }];
      let oms_cookie=document.cookie.indexOf("idOms=");
      if (oms_cookie!=-1) {
          return  <div>
                  <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>类目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>后端商品类目管理</Breadcrumb.Item>
                  </Breadcrumb>
                  <Divider />
                  <div className={categoryStyle.box}>
                  <div className={categoryStyle.item}>
                  <span>类目名称:</span>
                  <Input placeholder="请输入" style={{ width: 150,marginLeft:20 }} onChange={this.nameChange} value={this.state.searchName} />
                  </div>
                  <div className={categoryStyle.item}>
                  <span><span style={{color:'#f00'}}>*</span>类目归属:</span>
                  <Select defaultValue="请选择" style={{ width: 120,marginLeft:20 }} onChange={this.levelChange}>
                    <Option value="1">一级类目</Option>
                    <Option value="2">二级类目</Option>
                    <Option value="3">三级类目</Option>
                  </Select>
                  </div>
                  <div className={categoryStyle.item}>
                  <span><span style={{color:'#f00'}}>*</span>状态:</span>
                  <Select defaultValue="请选择" style={{ width: 120,marginLeft:20 }} onChange={this.statusChange}>
                    <Option value="2">启用</Option>
                    <Option value="1">禁用</Option>
                  </Select>
                  </div>
                  </div>
                  <div className={categoryStyle.btnGroup}>
                  <Button type="primary" onClick={ this.searchValue }>查询</Button>
                  <Button className={categoryStyle.resetBtn} onClick={ this.resetValue }>重置</Button>
                  </div>
                  <Table pagination={false} columns={columns} dataSource={categoryList} className={categoryStyle.treeList} />
                  <Modal
                    title="类目信息"
                    visible={this.state.infoVisible}
                    onOk={this.infoClose}
                    onCancel={this.infoClose}
                    cancelText="取消"
                    okText="确认"
                  >
                    <p>类目编号:{categoryInfo.id}</p>
                    <p>类目名称:{categoryInfo.name}</p>
                    <p>类目归属:{this.translevel(categoryInfo.level)}</p>
                    <p>类目排序:{categoryInfo.sequence}</p>
                    <p>创建日期:{common.convertTime(categoryInfo.createTime)}</p>
                    <p>状态:{this.transtatus(categoryInfo.status)}</p>
                  </Modal>
                  <Modal
                    title="修改排序"
                    visible={this.state.modifySortVisible}
                    onOk={this.modifySort}
                    onCancel={this.infoClose}
                    cancelText="取消"
                    okText="确认"
                  >
                      <div className={categoryStyle.sort_block}>
                          <div className={categoryStyle.sort_line_block}>
                              <span className={categoryStyle.sort_block_title}>旧排序:</span>
                              <span className={categoryStyle.sort_block_content}>{this.state.origin_sort}</span>
                          </div>
                          <div className={categoryStyle.sort_line_block}>
                              <span className={categoryStyle.sort_block_title}>新排序:</span>
                              <span className={categoryStyle.sort_block_content}><Input placeholder="请输入" onChange={this.inputNewsort} /></span>
                          </div>
                      </div>
                  </Modal>
                  </div>;
      } else {
          return <div>您还没登录，将会回到登录页面</div>;
      }
  }
}