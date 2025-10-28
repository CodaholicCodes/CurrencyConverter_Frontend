import React, { useState, useRef } from 'react';
import CurrencySelector from './CurrencySelector';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const amountInput = useRef();

  const convertHandler = () => {
    const amount = amountInput.current.value;
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    fetch('https://currency-converter-nnzj.onrender.com/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromCurrency,
        toCurrency,
        amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setConvertedAmount(data.targetAmount);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during conversion');
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Currency Converter</h2>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          ref={amountInput}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter amount"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <CurrencySelector label="From" value={fromCurrency} onChange={(e) => {setFromCurrency(e.target.value)}} />
        <CurrencySelector label="To" value={toCurrency} onChange={(e) => {setToCurrency(e.target.value)}} />
      </div>

      <button
        onClick={convertHandler}
        className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Convert
      </button>

      {convertedAmount !== null && (
        <div className="mt-4 text-center text-lg font-medium">
          <p className='font-extrabold'>
            {amountInput.current.value} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
