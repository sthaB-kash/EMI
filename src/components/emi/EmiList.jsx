import { useState, useEffect } from "react";
import { ADToBS, BSToAD } from "bikram-sambat-js";
import EMITable from "./Table";

// eslint-disable-next-line react/prop-types
const EmiList = ({ p, t, r, list = false }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [bsDate, setBsDate] = useState();
  const [emiList, setEmiList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
    console.log("value from date picker: " + e.target.value);
    // calculateEmi();
  };

  const calculateEmi = () => {
    let data = [];
    const emi = {
      dateAD: new Date(date).toDateString(),
      dateBS: ADToBS(date),
      days: 0,
      amtReceived: 0,
      interest: 0,
      principle: 0,
      remBalance: p,
      interestDue: 0,
    };
    data.push(emi);
    setEmiList(data);
    const dateRange = getDateRange();
    dateRange.forEach((d, index) => {
      let prevDate = index === 0 ? date : dateRange[index - 1];
      let principleAmtPerMonth = Number(p / t);
      let days = countDays(new Date(prevDate), new Date(d));
      data.push({
        dateAD: new Date(d).toDateString(),
        dateBS: ADToBS(d),
        days: days,
        amtReceived: 0,
        interest: ((data[index].remBalance * r) / 100 / 365) * days,
        principle: principleAmtPerMonth,
        remBalance: Number(
          data[index].remBalance - principleAmtPerMonth
        ).toFixed(2),
        interestDue: 0,
      });
    });
  };

  const countDays = (from, to) => {
    const diffTime = Math.abs(to - from);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
    return diffDays;
  };

  const getDateRange = () => {
    console.log("tenure: " + t);
    console.log("state-date: " + date);
    const initialDate = new Date(date);
    console.log("date", date, initialDate);
    let dates = [];
    for (let i = 1; i <= t; i++) {
      dates.push(
        new Date(initialDate.setMonth(initialDate.getMonth() + 1))
          .toISOString()
          .slice(0, 10)
      );
    }
    return dates;
  };

  useEffect(() => {
    if (date !== undefined) {
      setBsDate(ADToBS(date));
      calculateEmi();
    }
  }, [date]);

  const convertToAD = () => {
    console.log("bs date", bsDate);
    setDate(BSToAD(bsDate));
  };

  return (
    <section>
      <div>
        <h5 className="font-bold">Select Date</h5>
        <div className="text-xl mt-2">
          <label htmlFor="dateAd">AD: </label>
          <input
            id="dateAd"
            type="date"
            name="date"
            onChange={handleChange}
            value={date}
            className="p-1"
          />
        </div>
        <div className="text-xl mt-2">
          <label htmlFor="dateBs">BS: </label>
          <input
            id="dateBs"
            type="text"
            value={bsDate}
            className="p-1 w-[130px]"
            onChange={(e) => setBsDate(e.target.value)}
          />
          <button onClick={convertToAD} className="p-1 m-1">
            Convert
          </button>
        </div>
      </div>
      <EMITable data={emiList} />
    </section>
  );
};

export default EmiList;
