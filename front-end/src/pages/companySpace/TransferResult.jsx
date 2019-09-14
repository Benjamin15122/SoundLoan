import React, {Component} from 'react';
import { Icon } from 'antd';
import { transferMoney } from '@/services/enterprise';
import { getPageQuery } from '@/pages/user/utils/utils';

class TransferResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transferred: false,
    }
  }

  async componentDidMount() {
    const { code } = getPageQuery();
    const ok = await transferMoney({
      auth_code: code,
      amount: 100,
      source_id: '355a515030616a53576b6a65797359506a634175764a734a3238314e4668627349486a676f7449463949453d',
      payee_id: '7977557255484c7345546c4e53424766634b6c53756841672b556857626e395253334b70416449676b42673d',
    });
    this.setState({ loading: false, transfer: ok });
  }

  render() {
    const { transferred, loading } = this.state;
    const resultContent = () => {
      if (loading)
        return <h3>正在转账...<Icon type='loading'/></h3>;
      if (transferred)
        return <h3>转账成功！<Icon type='check'/></h3>;
      return <h3>转账失败！<Icon type='close'/></h3>
    };
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        {resultContent()}
      </div>
    );
  }
}

export default TransferResult;
