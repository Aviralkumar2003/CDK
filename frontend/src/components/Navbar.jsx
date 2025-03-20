import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const [selectedStore, setSelectedStore] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const stores = [
        { label: "S001-East", value: "S001" },
        { label: "S002-North", value: "S002" },
        { label: "S003-South", value: "S003" },
        { label: "S004-West", value: "S004" },
        { label: "S005-South", value: "S005" },
        { label: "All", value: "All" }
    ];

    const handleStoreChange = (e) => {
        const store = e.target.value;
        setSelectedStore(store);
        if (store === "All") {
            navigate("clusterAnalysis");
        } else {
            const params = new URLSearchParams(location.search);
            navigate(`/${store}?${params.toString()}`);
        }
    };

    return (
        <nav className="shadow-md bg-gradient-to-r from-black to-[#31837A]">
            <div className="flex items-center justify-between p-4">
                <div className="text-3xl font-bold text-white tracking-wide">
                    <Link
                        to="/"
                    >
                        CDK Global
                    </Link>
                </div>

                <div className="px-4">
                    <select
                        value={selectedStore}
                        onChange={handleStoreChange}
                        className="bg-[#31837A] text-white rounded-lg border-2 border-[#31837A] px-3 py-2 cursor-pointer shadow-md 
                        hover:bg-black hover:text-white transition duration-300"
                    >
                        <option value="">Select Store</option>
                        {stores.map((store) => (
                            <option key={store.value} value={store.value}>
                                {store.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </nav>
    );
}
