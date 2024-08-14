import { useState, useEffect } from "react";
import { ADToBS, BSToAD } from "bikram-sambat-js";

// eslint-disable-next-line react/prop-types
const EMITable = ({ p, t, r }) => {
  const [date, setDate] = useState();
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
      dateAD: date,
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
        dateAD: d,
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
    if (date !== undefined) calculateEmi();
  }, [date]);

  return (
    <section>
      <div>
        <input type="date" name="date" onChange={handleChange} value={date} />
      </div>
      <table className="table-auto w-full border border-slate-500 mt-14">
        <thead className="bg-indigo-800">
          <tr>
            <th className="border border-slate-500 ">SN</th>
            <th className="border border-slate-500 ">Date AD</th>
            <th className="border border-slate-500 ">Date BS</th>
            <th className="border border-slate-500 ">Days</th>
            <th className="border border-slate-500 ">Amount Received</th>
            <th className="border border-slate-500 ">Interest</th>
            <th className="border border-slate-500 ">Principle</th>
            <th className="border border-slate-500 ">Rem. Bal.</th>
            <th className="border border-slate-500 ">Interest Due</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {emiList.map((emi, index) => (
            <tr key={index}>
              <td className="border-slate-500 border">{index + 1}</td>
              <td className="border-slate-500 border">{emi.dateAD}</td>
              <td className="border-slate-500 border">{emi.dateBS}</td>
              <td className="border-slate-500 border">{emi.days}</td>
              <td className="border-slate-500 border">{emi.amtReceived}</td>
              <td className="border-slate-500 border">
                {Number(emi.interest).toFixed(2)}
              </td>
              <td className="border-slate-500 border">
                {Number(emi.principle).toFixed(2)}
              </td>
              <td className="border-slate-500 border">
                {Number(emi.remBalance).toFixed(2)}
              </td>
              <td className="border-slate-500 border">
                {Number(emi.interestDue).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EMITable;
