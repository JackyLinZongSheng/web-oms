import { Component } from 'react';
import { Layout, Menu, Icon,Modal } from 'antd';
import Link from 'umi/link';
import logo from '../assets/logo.png';
import * as common from '../util/common';


const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu; 

const confirm = Modal.confirm;

var sectionStyle = {
  margin: "16px",
  height: "40px",
  backgroundSize:"100% 40px",
  backgroundImage: `url(${logo})` 
};
var logoutStyle={
  float:"right",
  marginRight:"20px",
  fontSize:"14px",
  cursor:"pointer"
};

export default class BasicLayout extends Component {
  logout = () => {
    let _self=this;
    confirm({
      title: '您确定退出平台管理系统吗?',
      content: '',
      onOk() {
        common.clearAllCookie();
        _self.props.history.push('/user', null);
      },
      onCancel() {},
      okText:'确定',
      cancelText:'取消'
    });
  }
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={sectionStyle} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub1']}>
            <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>类目管理</span></span>}>
                <Menu.Item key="sub1-1">
                    <Link to="/helloworld">后端商品类目管理</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="dashboard" /><span>测试页,不用管</span></span>}>
                <Menu.Item key="sub2-1"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                <Menu.Item key="sub2-2"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                <Menu.Item key="sub2-3"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
              锐竞平台管理系统
              <div style={logoutStyle} onClick={() => this.logout()}>
                   退出登录
              </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>oms-web ©2019 Created by ruijing</Footer>
        </Layout>
      </Layout>
    )
  }
}
