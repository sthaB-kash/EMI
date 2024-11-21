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
    if (emiData.length > 0) setEmiData[0].remBalance = loanDetails.principle;
  }, [loanDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = { date, amount };
    console.log(payment);
  };

  const initialEntryHandler = () => {
    console.log(loanDetails);
    console.log(Object.values(loanDetails).filter((val) => val !== null));
    if (
      Object.values(loanDetails)
        .filter((val) => val !== null)
        .some((val) => val <= 0)
    )
      alert("Please provide loan details.");
    else
      setEmiData([
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
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-5 py-1 font-medium focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {emiData.length === 0 ? (
        <div className="flex justify-end mt-4">
          <button onClick={initialEntryHandler} className="px-3 py-2">
            Initial Entry
          </button>
        </div>
      ) : (
        <Table list={false} data={emiData} />
      )}
    </div>
  );
};

export default Payment;
