import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import styles from './Login.less';
import style2s from './Login.css';

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };
  constructor(props) {
    super(props);
    document.title="锐竞平台管理系统";

  }
  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    const currentProtocol = window.location.protocol;
    const currentHost = window.location.host;
    const absPrefix = currentProtocol + "//" + currentHost;

    const pathPrefix = window.location.pathname.split("/").slice(0,-1).join("/");

    //const fp_target = absPrefix + pathPrefix + "/index.html#findPassword";

    const ssoLoginSrc = "/oms/sso/login?type=oms&cb_target=" + encodeURIComponent(absPrefix +'/loginSuccess.html');
    return (
      <div className={style2s.oms_login_wrap}>
          <div className={style2s.login_wrap}>
              <p className={style2s.login_title}>账号登录</p>

              <div className={style2s.login_frame}>
                  <iframe id="loginFrame" src={ssoLoginSrc} className={style2s.login_iframe}>
                  </iframe>
              </div>
         </div>
      </div>
    );
  }
}

export default LoginPage;
