import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  showLines: false,
  elements: {
    line: {
      tension: 0, // disables bezier curves
    },
  },
};

function LineGraph({ casesType = "cases" }, props) {
  const [data, setData] = useState({});
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push({ ...newDataPoint });
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=150")
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(data);
          console.log(data);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {/* <h1>I am a graph</h1> */}
      {data?.length > 0 && (
        <Line
          options={options}
          type="line"
          data={{
            datasets: [
              {
                label: "World wide cases",
                borderColor: "rgb(204,16,52,0.5)",
                backgroundColor: "#CC1034",
                data: data,
                pointRadius: 3,
                fill: true,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
