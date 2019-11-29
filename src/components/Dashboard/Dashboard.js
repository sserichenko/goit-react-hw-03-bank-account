import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v1';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    try {
      const transactionFromLocalStorage = localStorage.getItem('transactions');
      const transactionFromLocalStorageBalance = localStorage.getItem(
        'balance',
      );
      if (transactionFromLocalStorage && transactionFromLocalStorageBalance) {
        this.setState({
          transactions: JSON.parse(transactionFromLocalStorage),
          balance: JSON.parse(transactionFromLocalStorageBalance),
        });
      }
    } catch (error) {
      toast.warn('Произошла ошибка чтения из локального хранилища !', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return '';
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (
      prevState.transactions !== transactions &&
      prevState.balance !== balance
    ) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  onDeposit = am => {
    if (Number(am) === 0 || Number(am) < 0) {
      return toast.warn('Введите сумму для проведения операции !', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const newOnDeposit = {
      id: uuid(),
      type: 'deposit',
      amount: Number(am),
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [newOnDeposit, ...state.transactions],
      balance: Number(state.balance) + Number(am),
    }));
    return '';
  };

  onWithdraw = am => {
    if (Number(am) === 0 || Number(am) < 0) {
      return toast.warn('Введите сумму для проведения операции !', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (Number(am) > this.state.balance) {
      return toast.error(
        'Недостаточно средств для транзакции, пополните, пожалуйста счет !',
        {
          position: toast.POSITION.TOP_RIGHT,
        },
      );
    }
    const newWithdraw = {
      id: uuid(),
      type: 'withdraw',
      amount: Number(am),
      date: new Date().toLocaleString(),
    };
    return this.setState(state => ({
      transactions: [newWithdraw, ...state.transactions],
      balance: Number(state.balance) - Number(am),
    }));
  };

  render() {
    const { transactions, balance } = this.state;

    const income = transactions.reduce(
      (acc, item) => (item.type === 'deposit' ? acc + item.amount : acc),
      0,
    );

    const expenses = transactions.reduce(
      (acc, item) => (item.type === 'withdraw' ? acc + item.amount : acc),
      0,
    );

    return (
      <>
        <div className={styles.dashboard}>
          <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
          <Balance balance={balance} income={income} expenses={expenses} />
          <TransactionHistory items={transactions} />
          <ToastContainer />
        </div>
      </>
    );
  }
}
