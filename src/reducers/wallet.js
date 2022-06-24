// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { NEW_EXPENSE, RECEIVE_CURRENCIES } from '../actions';
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
        id: state.expenses.length,
      },
      ],
    };
  default:
    return state;
  }
};

export default walletReducer;

// case NEW_EXPENSE:
// return {
//   ...state,
//   expenses: [
//     ...state.wallet.expenses,
//     {
//       ...action.payload,
//       id: state.wallet.expenses.length,
//     },
//   ],
// total: total + (value * state.wallet.currencies[currencies].ask),
// };

// this.setState((prevState) => ({
//   cards: {...prevState.cards, requested: [...prevState.cards.requested, card] },
//   card: {
//     what: '',
//     how: '',
//     who: '',
//     when: '',
//   },
// }));
