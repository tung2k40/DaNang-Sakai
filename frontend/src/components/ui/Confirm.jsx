import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Confirm({ title, message, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-[90%] max-w-sm p-6 rounded-2xl shadow-xl text-center"
            >
                <div className="flex justify-center mb-3">
                    <AlertTriangle className="text-yellow-500" size={48} strokeWidth={1.5} />
                </div>

                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-1">{message}</p>

                <div className="flex gap-3 mt-5">
                    <button
                        onClick={onCancel}
                        className="w-1/2 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-1/2 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
                    >
                        Xác nhận
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
