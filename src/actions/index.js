export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const BEING_EDITED = 'BEING_EDITED';
export const FINISHED_EDITING = 'FINISHED_EDITING';

export function createSetEmail(email) {
  return { type: SET_EMAIL, payload: email };
}

export function createNewExpense(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    const newExpense = { ...expense, exchangeRates };
    dispatch({ type: NEW_EXPENSE, payload: newExpense });
  };
}

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const beingEdited = (id) => ({
  type: BEING_EDITED,
  id,
});

export const finishedEditing = (expense) => ({ // botão salvar edição, fazer update despesa; arg era payload em 24/6
  type: FINISHED_EDITING,
  expense,
});

// preciso descobrir qual id a editar. (beingEdited). no formulario preciso pegar os dados do id a ser editado. apos, colocar os dados no formulario. apos isso, criar action pra atualizar o estado.

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(receiveCurrencies(currencies));
  };
}
