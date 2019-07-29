import React, {Component} from 'react'
import style from './style.less'
import { Button, Icon } from 'antd';
import { Link } from 'umi';


export default class SelectUserType extends Component {

    static defaultProps = {
        linkToPerson: '/404',
        linkToEnterprise: '/404',
    }

    render() {
        const {linkToPerson, linkToEnterprise} = this.props;

        return  <>
            <div className={style.title}>请选择您的身份</div>
            <div>
                <Link to={linkToPerson}>
                    <Button
                        icon='user' shape='round' size='large'
                    >
                        个人用户
                    </Button>
                </Link>
                <Link to={linkToEnterprise}>
                    <Button
                        icon='team' shape='round' size='large'
                    >
                        企业用户
                    </Button>
                </Link>
            </div>
        </>
        
    }
}