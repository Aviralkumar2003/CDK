import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="p-6 bg-white max-h-screen">
            <motion.div
                className="items-center justify-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
            >
                <p className="text-5xl font-bold text-center leading-snug">
                    <span className="text-black">Project </span>
                    <span className="text-black">Mecha</span>
                </p>
            </motion.div>

            <motion.div
                className="items-center justify-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
            >
                <p className="text-xl font-bold text-center leading-snug">
                    <span className="text-black">Dealer Success Drives </span>
                    <span className="text-[#31837A]">Everything We Do</span>
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 mt-8">
                <motion.div
                    className="bg-gradient-to-r from-black to-[#31837A] text-white rounded-xl p-6 flex-1 shadow-md"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.03 }}
                >
                    <h2 className="text-xl font-bold mb-4">About Mecha</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>This project provides an ML-driven solution that predicts the optimum inventory restocking strategy
                            for car dealership repair shops.
                        </li>
                        <li>
                            It allows comprehensive visualisations to predict the demand for spare parts utilizing
                            historical repair order data, inventory usage patterns, and seasonal trends to build a model
                            that dynamically suggests restocking quantities for each part.
                        </li>
                        <li>
                            Handles fluctuating demand across months and
                            identifies critical spare parts with high usage frequency.
                        </li>
                    </ul>
                    <h3 className="text-xl font-bold mt-4">Tech Stack Used</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Programming Languages : Python, Javascript</li>
                        <li>Model : FBProphet</li>
                        <li>Frameworks : Flask, React</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
