import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  // deleteExpense = (id) => {
  //   const { expenses } = this.props;
  //   this.setState({
  //     expenses: [...expenses, expenses.filter((expense) => expense.id !== id)],
  //   });
  // }

  render() {
    const { expenses, dispatch, editTask } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ parseFloat(expense.value).toFixed(2) }</td>
              <td>
                { (expense.exchangeRates[expense.currency].name).split('/')[0] }
              </td>
              <td>
                { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
              </td>
              <td>{ expense.value * expense.exchangeRates[expense.currency].ask}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editTask(expense) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpense(expense.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
