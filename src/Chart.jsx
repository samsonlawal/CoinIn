import { useState, useEffect } from "react";
import Charts from "react-apexcharts";

export default function Chart({ data }) {
  // State to hold chart options
  const [chartOptions, setChartOptions] = useState(null);

  // Determine line color based on data
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const lineColor =
        data.slice(-1)[0][1] > data[0][1] ? "#27ca4e" : "#ff3a33";
      const options = {
        chart: {
          type: "line",
          toolbar: false,
          animations: {
            enabled: false,
          },
        },
        noData: {
          text: "Loading...",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#000000",
            fontSize: "14px",
            fontFamily: "Helvetica",
          },
        },
        series: [
          {
            name: "Prices",
            data: data,
          },
        ],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
            hover: {
              size: 0,
            },
          },
        },
        stroke: {
          width: 1,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          type: ["solid"],
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        grid: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        colors: [lineColor],
      };
      setChartOptions(options);
    }
  }, [data]);

  // Render the chart only when chart options are available
  return chartOptions ? (
    <Charts
      height="60%"
      id="charts"
      options={chartOptions}
      series={chartOptions.series}
      type="line"
      width="150"
    />
  ) : (
    <div>Loading...</div>
  );
}
