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
    <div className="mt-10">
      <div className="border rounded px-4 pb-4">
        <h2 className="text-xl mt-4 font-bold">Payment</h2>
        <form onSubmit={handleSubmit} className="w-fit">
          <div className="flex justify-between mb-2">
            <label htmlFor="paymentDate">Enter Date: </label>
            <input
              type="text"
              value={date}
              id="paymentDate"
              className="p-1 rounded text-end pr-2"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="amount">Enter Amount: &nbsp;</label>
            <input
              type="number"
              step=".01"
              value={amount}
              id="amount"
              className="p-1 rounded text-end pr-2"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="px-5 py-1 font-medium">
              Save
            </button>
          </div>
        </form>
      </div>
      <Table list={false} data={emiData} />
    </div>
  );
};

export default Payment;
