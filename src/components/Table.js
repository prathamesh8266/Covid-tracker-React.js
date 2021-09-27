import React from "react";
import "./Table.css";

function Table({ countries }) {
  //   console.log(countries);
  let count = 0;
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr key={count++}>
          <td>{country}</td>
          <td>
            <b>{cases}</b>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
