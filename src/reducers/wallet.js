// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  BEING_EDITED, DELETE_EXPENSE, FINISHED_EDITING, NEW_EXPENSE, RECEIVE_CURRENCIES,
}
from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const UNSUPPORTED_CURRENCIES = ['USDT'];
const walletReducer = (state = INITIAL_STATE, action) => {
  // const { wallet: { currencies } } = this.state;
  // const { value } = this.props;
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: (Object.keys(action.currencies))
        .filter((value) => !UNSUPPORTED_CURRENCIES.includes(value)), // it was 'value' before getting value from props
    };
  case NEW_EXPENSE:
    console.log('state:', state);
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload,
        id: state.expenses.length,
      },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case BEING_EDITED:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case FINISHED_EDITING:
    return {
      ...state,
      expenses: [...state.expenses].reduce((acc, cur) => {
        if (cur.id === action.expense.id) { // action.expense.id é o conteudo do objeto sendo editado
          acc.push(action.expense);
        } else {
          acc.push(cur);
        }
        return acc;
      }, []),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
