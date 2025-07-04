import ReactApexChart from "react-apexcharts";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart, resetCoinState } from "../../State/Coin/Action";
import { Loader } from "../../components/ui/loader";
import toast from "react-hot-toast";

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  console.log(coin.marketChart.data)

  const timeSeries = [
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Daily Time Series",
      label: "1 Day",
      value: 1,
    },
    {
      keyword: "DIGITAL_CURRENCY_WEEKLY",
      key: "Weekly Time Series",
      label: "1 Week",
      value: 7,
    },
    {
      keyword: "DIGITAL_CURRENCY_MONTHLY",
      key: "Monthly Time Series",
      label: "1 Month",
      value: 30,
    },
    {
      keyword: "DIGITAL_CURRENCY_YEARLY",
      key: "Yearly Time Series",
      label: "1 Year",  
      value: 365,
    },
  ];

  const [activeLable, setActiveLable] = useState(timeSeries[0]);

  useEffect(() => {
    dispatch(fetchMarketChart({coinId : coinId, days: activeLable.value }));
  }, [activeLable]);

  
  useEffect(() => {
  if (coin.marketChart.error && coin.marketChart.data.length == 0) {
    toast.error(coin.marketChart.error);
    
    dispatch(fetchMarketChart({coinId : coinId, days: activeLable.value }));

  }
}, [coin.marketChart.error]);

  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#d0aafa", // X-axis label color
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
        color: "#a250fa", // X-axis border color
      },
      axisTicks: {
        show: true,
        color: "#888888", // X-axis tick color
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#d0aafa", // Y-axis label color
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
        color: "#a250fa", // Y-axis border color
      },
      axisTicks: {
        show: true,
        color: "#888888", // Y-axis tick color
      },
    },
    colors: ["#4902ba"],
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  const handleActiveLable = (value) => {
    setActiveLable(value);
  };

  return coin.marketChart.loading ? <Loader/> :(
    <div>
      <div className="space-x-5">
        {timeSeries.map((item) => (
          <Button
            className="cursor-pointer"
            variant={activeLable.label === item.label ? "" : "outline"}
            onClick={() => handleActiveLable(item)}
            key={item.label}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={series}
          height={450}
          type="area"
        />
      </div>
    </div>
  );
};

export default StockChart;
