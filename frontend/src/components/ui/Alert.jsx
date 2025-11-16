import { motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";

export default function Alert({ open, onClose, title, message, type = "success" }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-[90%] max-w-sm p-6 rounded-2xl shadow-xl text-center"
            >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                    {type === "success" ? (
                        <CheckCircle className="text-green-500" size={48} strokeWidth={1.5} />
                    ) : (
                        <Info className="text-blue-500" size={48} strokeWidth={1.5} />
                    )}
                </div>

                {/* Title & message */}
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-1">{message}</p>

                {/* Button */}
                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
                >
                    OK
                </button>
            </motion.div>
        </div>
    );
}
