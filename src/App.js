import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  // state = {
  //   user: {
  //     email: '', // string que armazena o email da pessoa usuária
  //   },
  //   wallet: {
  //     currencies: [], // array de string
  //     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  //     editor: false, // valor booleano que indica de uma despesa está sendo editada
  //     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  //   },
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
