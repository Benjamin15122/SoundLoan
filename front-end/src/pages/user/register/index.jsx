import React, { Component } from 'react';
import SelectUserType from '../components/SelectUserType'
import { getPageQuery } from '@/pages/user/utils/utils';
import RegisterForPerson from '@/pages/user/register/components/Person';
import RegisterForEnterprise from '@/pages/user/register/components/Enterprise';

class Register extends Component {

  render() {
    const query = getPageQuery();

    if (query.type === 'person') {
      return <RegisterForPerson />
    }
    else if (query.type === 'enterprise') {
      return <RegisterForEnterprise />
    }
    else {
      return <SelectUserType
        linkToPerson="?type=person"
        linkToEnterprise="?type=enterprise"
      />;
    }
  }
}

export default Register;
