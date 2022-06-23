/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  state = {
    total: 0,
    currency: 'BRL',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { total, currency } = this.state;
    const { userEmail, currencies } = this.props;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{ userEmail }</span>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field">{ currency }</span>
          <form>
            <label htmlFor="value">
              VALOR:
              <input
                type="text"
                data-testid="value-input"
                id="value"
                placeholder="R$0,00"
              />
            </label>
            <label htmlFor="description">
              DESCRIÇÃO:
              <input
                type="text"
                data-testid="description-input"
                id="description"
                placeholder="Ex: cachorro quente"
              />
            </label>
            <label htmlFor="moeda">
              MOEDA:
              <select id="moeda">
                {currencies.map((item) => (
                  <option key={ item } value={ item }>{ item }</option>
                ))}
              </select>
            </label>
            <select id="payment" data-testid="method-input">
              MÉTODO DE PAGAMENTO:
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
            <select id="expenses" data-testid="tag-input">
              TAG:
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </form>

        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

Wallet.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(Wallet);
