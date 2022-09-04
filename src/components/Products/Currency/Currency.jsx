import React, { Component } from 'react';
import './currency.css';

class Currency extends Component {
  constructor(props) {
    super(props);
}
render() {
  const { currencies , showOptionList, selectValue, handleOptionClick, handleListDisplay} = this.props;
  return (
    <div className="custom-select-container">
      <div
        className={showOptionList ? "selected-text active" : "selected-text"}
        onClick={handleListDisplay}
        
      >
        {selectValue.slice(0, -4)}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {currencies.map(option => {
            return (
              <li
                className="custom-select-option"
                data-name={`${option.symbol + " "}${option.label}`}
                key={option.symbol}
                onClick={handleOptionClick}>
                {option.symbol + " "}{option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
}

export default Currency;
