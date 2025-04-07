import { useState } from "react";
import "./index.css";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tipAmount = bill
    ? (Number(bill) * (percentage1 + percentage2)) / 2 / 100
    : 0;
  const tip = Number.parseFloat(tipAmount.toFixed(2));
  const total = bill ? Number.parseFloat((Number(bill) + tip).toFixed(2)) : 0;

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Tip Calculator</h2>

      <div className="calculator-body">
        <BillInput bill={bill} onSetBill={setBill} />

        <SelectPercentage
          percentage={percentage1}
          onSetPercentage={setPercentage1}
        >
          How did you like the service?
        </SelectPercentage>

        <SelectPercentage
          percentage={percentage2}
          onSetPercentage={setPercentage2}
        >
          How did your friend like the service?
        </SelectPercentage>

        {Number(bill) > 0 && (
          <div className="result-section">
            <Output bill={Number(bill)} tip={tip} total={total} />
            <Reset onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div className="input-group">
      <label>How much was the bill?</label>
      <div className="bill-input-container">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          placeholder="0.00"
          value={bill}
          onChange={(e) => onSetBill(e.target.value)}
        />
      </div>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSetPercentage }) {
  return (
    <div className="input-group">
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="15">Absolutely amazing (15%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip, total }) {
  return (
    <div className="output-container">
      <h3>
        Total: ${total.toFixed(2)}
        <span className="output-details">
          (${bill.toFixed(2)} + ${tip.toFixed(2)} tip)
        </span>
      </h3>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <button onClick={onReset} className="reset-button">
      Reset
    </button>
  );
}
