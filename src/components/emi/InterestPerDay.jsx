import { useContext } from "react";
import { EmiContext } from "./emiContext";

const InterestPerDay = () => {
  const { data, setData } = useContext(EmiContext);

  return (
    <section className="border rounded p-3">
      <div>
        <pre>p * (r/100)/365 * days</pre>
        <h3>
          Interest Per Day:{" "}
          {Number((data.principle * (data.rate / 100)) / 365).toFixed(2)}
        </h3>
      </div>
    </section>
  );
};

export default InterestPerDay;
