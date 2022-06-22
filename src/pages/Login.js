import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmailValid, isPasswordValid } from '../utils';
import { createSetEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit = (event) => {
    const { email } = this.state;
    const { history, setEmail } = this.props;
    event.preventDefault();
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const isFormValid = email
    && isEmailValid(email) && password && isPasswordValid(password);
    return (
      <div>
        <h1>Página de Login</h1>
        <form
          onSubmit={ this.onSubmit }
        >
          <label htmlFor="email">
            Digite aqui seu email:
            <input
              type="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="password">
            Digite aqui sua senha:
            <input
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button type="submit" disabled={ !isFormValid }>
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(createSetEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
