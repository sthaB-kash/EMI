import { useContext, useState, useEffect } from "react";
import { ADToBS, BSToAD } from "bikram-sambat-js";
import { EmiContext } from "./emiContext";
import Table from "./Table";

const Payment = () => {
  const { loanDetails } = useContext(EmiContext);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(0.0);
  const [emiData, setEmiData] = useState([]);

  useEffect(() => {
    setDate(ADToBS(new Date().toISOString().slice(0, 10)));
  }, []);

  useEffect(() => {
    date !== null &&
      setEmiData([
        ...emiData,
        {
          dateAD: new Date(BSToAD(date)).toDateString(),
          dateBS: date,
          days: 0,
          amtReceived: 0,
          interest: 0,
          principle: 0,
          remBalance: loanDetails.principle,
          interestDue: 0,
        },
      ]);
  }, [date, loanDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = { date, amount };
    console.log(payment);
  };

  return (
    <div className="mt-96 border rounded">
      <h2 className="text-xl mt-4">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="paymentDate">Enter Date: </label>
          <input
            type="text"
            value={date}
            id="paymentDate"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Enter Amount: </label>
          <input
            type="number"
            step=".01"
            value={amount}
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>

      <Table list={false} data={emiData} />
    </div>
  );
};

export default Payment;
