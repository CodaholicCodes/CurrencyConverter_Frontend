import React from 'react';
import currencies from '../utils/currencies';

const CurrencySelector = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      {/* Label */}
      <label
        htmlFor="currency-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      {/* Select Dropdown */}
      <select
        id="currency-select"
        name="currency"
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {currencies[currency].flag} {currency} - {currencies[currency].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
