import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function ClusterAnalysis() {
    const [data, setData] = useState([]);

    const categoryMapping = {
        0: "Accessories",
        1: "Breaks",
        2: "Cooling System",
        3: "Electrical",
        4: "Engine"
    };

    const storeMapping = {
        0: "S001",
        1: "S002",
        2: "S003",
        3: "S004",
        4: "S005"
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:5000/clustering");
                if (!response.ok) throw new Error("Failed to fetch forecast data");
                const result = await response.json();
                setData(result.clusters);
            } catch (error) {
                console.log("Error:", error);
            }
        }

        fetchData();
    }, []);

    const groupedData = data.reduce((acc, point) => {
        const cluster = point.cluster;
        if (!acc[cluster]) acc[cluster] = [];

        acc[cluster].push({
            x: point.sales,
            y: point.category,
            storeId: storeMapping[point.store_id] || `Unknown (${point.store_id})`
        });

        return acc;
    }, {});

    const clusterColors = ["#FF5733", "#33FF57", "#3357FF", "#F3C300", "#875F9A"];

    const chartData = {
        datasets: Object.keys(groupedData).map((cluster, index) => ({
            label: `Cluster ${cluster}`,
            data: groupedData[cluster],
            backgroundColor: clusterColors[index % clusterColors.length]
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const sales = context.raw.x;
                        const storeId = context.raw.storeId;
                        return `Sales: ${sales} | Store ID: ${storeId}`;
                    }
                }
            },
            legend: {
                labels: { color: "#000" }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Sales (EWMA)", color: "#000" },
                ticks: { color: "#000" }
            },
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function (value) { 
                        return categoryMapping[value] || `Unknown (${value})`; 
                    },
                    color: "#000"
                },
                title: { display: true, text: "Category", color: "#000" }
            }
        }
    };

    return (
        <div className="max-h-[470px] flex flex-col justify-center items-center 
                        m-5 p-10 shadow-lg rounded-xl">
            <h1 className="text-xl text-center font-bold">Cluster Analysis</h1>
            <Scatter data={chartData} options={options} />
        </div>
    );
}
