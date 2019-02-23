import React, { Fragment } from 'react';
import { Checkbox, Alert, Icon } from 'antd';
import styles from './UserLayout.less';
import Link from 'umi/link';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
                <span className={styles.title}>锐竞平台管理系统</span>
            </div>
            <div className={styles.desc}>锐竞采购平台 是海珠区最具影响力的 互联网电商采购平台</div>
          </div>
          {children}
        </div>

      </div>
    );
  }
}

export default UserLayout;
