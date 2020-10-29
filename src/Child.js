import React, { useContext, useState } from "react";
import { TransactionContext } from "./transContext";

function Child() {
  let { transactions, addTransaction } = useContext(TransactionContext);
  let [newDesc, setDesc] = useState("");
  let [newAmount, setAmount] = useState(0);

  const handleAddition = (event) => {
    event.preventDefault();
    if (Number(newAmount) === 0) {
      alert("Please enter a real value");
      return false;
    }
    addTransaction({
      amount: Number(newAmount),
      desc: newDesc,
    });

    setDesc("");
    setAmount(0);
  };

  const getIncome = () => {
    let income = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) income = income + transactions[i].amount;
    }
    return income;
  };

  const getExpense = () => {
    let expense = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0) expense += transactions[i].amount;
    }
    return expense;
  };

  return (
    <div class="container">
      <h1 class="text-center">Expense Tracker</h1>

      <h3>
        YOUR BALANCE <br /> Rs. {getIncome() + getExpense()}
      </h3>

      <div class="expense-container">
        <h3>
          INCOME <br /> Rs. {getIncome()}
        </h3>
        <h3>
          EXPENSE <br /> Rs. {getExpense()}
        </h3>
      </div>
      <h3>History</h3>
      <hr />

      <ul class="transaction-list">
        {transactions.map((transobj, ind) => {
          return (
            <li key={ind}>
              <span>{transobj.desc}</span>
              <span>Rs. {transobj.amount}</span>
            </li>
          );
        })}
      </ul>

      <h3>Add new trasaction</h3>
      <hr />

      <form className="transaction-form" onSubmit={handleAddition}>
        <label>
          Enter Discription <br />
          <input
            type="text"
            value={newDesc}
            placeholder="Description"
            onChange={(ev) => setDesc(ev.target.value)}
            required
          />
        </label>

        <br />

        <label>
          Enter Amount <br />
          <input
            type="number"
            value={newAmount}
            placeholder="Amount in Rupees"
            onChange={(ev) => setAmount(ev.target.value)}
            required
          />
        </label>

        <br />

        <input type="submit" value="Add Transaction" />
      </form>
    </div>
  );
}

export default Child;
