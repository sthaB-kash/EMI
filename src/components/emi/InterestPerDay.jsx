import { useContext } from "react";
import { EmiContext } from "./emiContext";

const InterestPerDay = () => {
  const { loanDetails } = useContext(EmiContext);

  return (
    <section className="border rounded p-3">
      <div>
        <pre>p * (r/100)/365 * days</pre>
        <h3>
          Interest Per Day:{" "}
          {Number(
            (loanDetails.principle * (loanDetails.rate / 100)) / 365
          ).toFixed(2)}
        </h3>
      </div>
    </section>
  );
};

export default InterestPerDay;
