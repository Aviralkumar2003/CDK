import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const storeOptions = [
  { label: "S001", value: "S001" },
  { label: "S002", value: "S002" },
  { label: "S003", value: "S003" },
  { label: "S004", value: "S004" },
  { label: "S005", value: "S005" },
];

const productOptions = [
  { label: "Air Filter", value: "Air Filter" },
  { label: "Alternator", value: "Alternator" },
  { label: "Battery", value: "Battery" },
  { label: "Brake Pad", value: "Brake Pad" },
  { label: "Coolant", value: "Coolant" },
];

function App() {
  const [store, setStore] = useState(storeOptions[0].value);
  const [product, setProduct] = useState(productOptions[0].value);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      store_id: store,
      product_name: product,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }
      const result = await response.json();
      setForecastData(result);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
    setLoading(false);
  };

  const prepareChartData = () => {
    if (!forecastData) return null;

    const predDates = forecastData.predicted_sales.map(item => item.date);
    const predictedValues = forecastData.predicted_sales.map(item => item.predicted);
    const lowerBounds = forecastData.predicted_sales.map(item => item.lower_bound);
    const upperBounds = forecastData.predicted_sales.map(item => item.upper_bound);

    return {
      labels: predDates,
      datasets: [
        {
          label: 'Predicted Sales',
          data: predictedValues,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Actual Sales',
          data: forecastData.predicted_sales.map(item => {
            const actualEntry = forecastData.actual_sales.find(a => a.date === item.date);
            return actualEntry ? actualEntry.actual : null;
          }),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1,
          fill: false,
        },
        // {
        //   label: 'Inventory Level',
        //   data: forecastData.inventory_level.map(item => {
        //     const inventoryEntry = forecastData.inventory_level.find(i => i.date === item.date);
        //     return inventoryEntry ? inventoryEntry.inventory : null;
        //   }),
        //   borderColor: 'rgb(54, 162, 235)',
        //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //   tension: 0.1,
        //   fill: false,
        // },
        {
          label: 'Confidence Interval',
          data: lowerBounds,
          borderColor: 'rgba(0,0,0,0)',
          pointRadius: 0,
          fill: '-1',
        },
        {
          label: 'Upper Confidence',
          data: upperBounds,
          borderColor: 'rgba(0,0,0,0)',
          pointRadius: 0,
          fill: '-1',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Sales Forecast for ${product} in ${store}`,
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Sales' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sales Forecast Dashboard</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Store</label>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              {storeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              {productOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Forecast'}
            </button>
          </div>
        </form>

        {forecastData && (
          <div className="mt-8">
            <Line data={prepareChartData()} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
