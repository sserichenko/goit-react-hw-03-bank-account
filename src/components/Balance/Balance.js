import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={styles.balance}>
    <span>
      <span className={styles.row__income}>&#8593;</span>
      {income}$
    </span>
    <span>
      <span className={styles.row__expenses}>&#8595;</span>
      {expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
