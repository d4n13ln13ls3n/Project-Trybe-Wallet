import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  state = {
    total: 0,
    currency: 'BRL',
  }

  render() {
    const { total, currency } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{ userEmail }</span>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field">{ currency }</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Wallet);
