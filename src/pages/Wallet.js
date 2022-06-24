/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, createNewExpense } from '../actions';

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  state = {
    currency: 'USD',
    value: 0,
    method: 'Dinheiro',
    tag: ALIMENTACAO,
    description: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onSaveExpense = async (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    await dispatch(createNewExpense(this.state)); // setEmail is a key in sDTP, which dispatches the function createSetEmail, which is an action inside /actions/index.js
    this.setState({
      value: 0,
    });
  }

  render() {
    const { currency, value, method, tag, description } = this.state;
    const { userEmail, currencies, expenses } = this.props;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{ userEmail }</span>
          <span data-testid="total-field">
            { expenses.reduce((acc, cur) => {
              acc += (cur.value * cur.exchangeRates[cur.currency].ask);
              return acc;
            }, 0).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
          <form onSubmit={ this.onSaveExpense }>
            <label htmlFor="value">
              VALOR:
              <input
                type="text"
                data-testid="value-input"
                id="value"
                value={ value }
                name="value"
                placeholder="R$0,00"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              DESCRIÇÃO:
              <input
                type="text"
                name="description"
                value={ description }
                data-testid="description-input"
                id="description"
                placeholder="Ex: cachorro quente"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="moeda">
              MOEDA:
              <select
                id="moeda"
                name="currency"
                value={ currency }
                onChange={ this.onInputChange }
              >
                {currencies.map((item) => (
                  <option key={ item } value={ item }>{ item }</option>
                ))}
              </select>
            </label>
            <select
              id="payment"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              MÉTODO DE PAGAMENTO:
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              id="expenses"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.onInputChange }
            >
              TAG:
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            <button
              type="submit"
            >
              Adicionar despesa
            </button>
          </form>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Wallet.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(Wallet);
