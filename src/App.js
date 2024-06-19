import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length + 1),
        description,
        datetime})
    }).then(response => {
      response.json().then(json => {
        setName("");
        setDescription("");
        setDateTime("");
        console.log(json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance  += transaction.price;
  }

  return (
    <main>
      <h1>${balance}<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="+200 new"
          />
          <input type='datetime-local'
              value={datetime}
              onChange={e => setDateTime(e.target.value)}
          />
        </div>
        <div className="description">
          <input type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={description}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction, index) => (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={"price " + (transaction.price<0?"red":"green")}>{transaction.price}</div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
        ))}

      </div>

    </main>
  );
}

export default App;
