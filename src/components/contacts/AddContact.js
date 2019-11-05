import React, { Component } from 'react';
import { Consumer } from './../../context';
import TextInputGroup from './../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === '')
      return this.setState({ errors: { name: 'Name is required' } });
    if (email === '')
      return this.setState({ errors: { email: 'Email is required' } });
    if (phone === '')
      return this.setState({ errors: { phone: 'Phone is required' } });

    const newContact = {
      name,
      email,
      phone
    };
    
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    // CLEAR STATE AFTER SUBMIT
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onInputChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.onInputChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={this.onInputChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
