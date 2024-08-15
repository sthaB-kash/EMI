/* eslint-disable react/prop-types */

const Table = ({ list = true, data }) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full border border-slate-500 mt-14">
        <thead className="bg-indigo-800 whitespace-nowrap wrap">
          <tr>
            <th className="border border-slate-500 ">SN</th>
            <th className="border border-slate-500 ">Date AD</th>
            <th className="border border-slate-500 ">Date BS</th>
            <th className="border border-slate-500 ">Days</th>
            {!list && (
              <th className="border border-slate-500 ">Amount Received</th>
            )}
            <th className="border border-slate-500 ">Interest</th>
            <th className="border border-slate-500 ">Principle</th>
            <th className="border border-slate-500 ">Rem. Bal.</th>
            {!list && (
              <th className="border border-slate-500 ">Interest Due</th>
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((emi, index) => (
            <tr key={index}>
              <td className="border-slate-500 border">{index + 1}</td>
              <td className="border-slate-500 border">{emi.dateAD}</td>
              <td className="border-slate-500 border">{emi.dateBS}</td>
              <td className="border-slate-500 border">{emi.days}</td>
              {!list && (
                <td className="border-slate-500 border">{emi.amtReceived}</td>
              )}
              <td className="border-slate-500 border">
                {Number(emi.interest).toFixed(2)}
              </td>
              <td className="border-slate-500 border">
                {Number(emi.principle).toFixed(2)}
              </td>
              <td className="border-slate-500 border">
                {Number(emi.remBalance).toFixed(2)}
              </td>
              {!list && (
                <td className="border-slate-500 border">
                  {Number(emi.interestDue).toFixed(2)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
