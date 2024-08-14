import "./App.css";
import { useState } from "react";

function App() {
  const [principle, setPrinciple] = useState();
  const [rate, setRate] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  const [emi, setEmi] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    calculateEMI(data);
  };

  const calculateEMI = (data) => {
    console.log(data.principle, data.rate, data.year, data.month);
    let p = Number(data.principle); //Number.parseFloat(principle);
    let r = Number(data.rate) / (100 * 12); // calculate per month for EMI
    let y = Number(data.year);
    let m = Number(data.month);
    let n = y * 12 + m;

    console.log(p, r, y, m);

    console.log("Months", n);

    let emi = (p * r * Math.pow(r + 1, n)) / (Math.pow(r + 1, n) - 1);
    console.log("EMI", emi);
    setEmi(emi.toFixed(2));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        Equated Monthly Installment
      </h1>
      <form className="mt-6 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <div className="pb-2 flex justify-between items-center gap-2">
          <label>Principle Amount:</label>
          <input
            type="number"
            name="principle"
            className=""
            value={principle}
            onChange={(e) => setPrinciple(e.target.value)}
          />
        </div>
        <div className="pb-2 flex justify-between items-center gap-2">
          <label>Interest Rate(%):</label>
          <input
            type="number"
            name="rate"
            className=""
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="pb-2 flex justify-between items-center gap-2">
          <label>Tenure:</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="year"
              className="w-[100px]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <label>Year(s)</label>
            <input
              type="number"
              name="month"
              className="w-[100px]"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <label>Month(s)</label>
          </div>
        </div>
        <div className="flex justify-end items-end mt-2">
          <button type="submit" className="btn">
            Calculate EMI
          </button>
        </div>
      </form>

      <h1 className="text-2xl font-bold text-center mt-3">
        EMI: <span>{emi}</span>
      </h1>
    </>
  );
}

export default App;
