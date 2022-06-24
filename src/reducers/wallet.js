// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETE_EXPENSE, NEW_EXPENSE, RECEIVE_CURRENCIES } from '../actions';
// import { uuid } from '../utils';

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
      },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
