import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleInputChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onDeposit = () => {
    const { onDeposit } = this.props;
    onDeposit(this.state.amount);
    this.setState({ amount: '' });
  };

  onWithdraw = () => {
    const { onWithdraw } = this.props;
    onWithdraw(this.state.amount);
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          onChange={this.handleInputChange}
          type="number"
          name="amount"
          value={amount}
        />
        <button
          className={styles.button}
          onClick={this.onDeposit}
          type="button"
        >
          Deposit
        </button>
        <button
          className={styles.button}
          onClick={this.onWithdraw}
          type="button"
        >
          Withdraw
        </button>
      </section>
    );
  }
}
