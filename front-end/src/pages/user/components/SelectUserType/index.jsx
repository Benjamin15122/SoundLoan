import React, {Component} from 'react'
import style from './style.less'
import { Button, Icon } from 'antd';


export default class SelectUserType extends Component {

    static defaultProps = {
        linkForPerson: '/404',
        linkForEnterprise: '/404',
    }

    render() {
        const {linkForPerson, linkForEnterprise} = this.props;

        return  <>
            <div className={style.title}>请选择您的身份</div>
            <div>
                <Button
                    icon='user' shape='round' size='large' href={linkForPerson}
                >
                    个人用户
                </Button>
                <Button
                    icon='team' shape='round' size='large' href={linkForEnterprise}
                >
                    企业用户
                </Button>
            </div>
        </>
        
    }
}