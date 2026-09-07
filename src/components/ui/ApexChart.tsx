import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const ApexChart = () => {
  const series = [
    {
      name: "Solar",
      data: [42, 130, 58, 94, 50, 52, 57],
    },
    {
      name: "Wind",
      data: [28, 35, 22, 41, 33, 26, 38],
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },

    title: {
      text: "Renewable Energy Generation",
      align: "left",
    },

    xaxis: {
      type: "datetime",
      categories: [
        "2025-06-01",
        "2025-06-02",
        "2025-06-03",
        "2025-06-04",
        "2025-06-05",
        "2025-06-06",
        "2025-06-07",
        
      ],
    },

    yaxis: {
      labels: {
        formatter: (val) => `${val} GWh`,
      },
    },

    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
  };

  return (
    <div className="bg-white shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;