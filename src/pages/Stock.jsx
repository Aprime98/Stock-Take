import { useState } from "react";
import {
    StockCard, Buttons
} from "../components";

function todayStr() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function emptyValues() {
    return { route: "", itemName: "", takenOn: todayStr(), quantity: "" };
}
export default function Stock({ onSaveEntry }) {
    const [values, setValues] = useState(emptyValues());
    const [toast, setToast] = useState("");

    function showToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(""), 1800);
    }

    function handleSave() {
        if (!values.route || !values.itemName || values.quantity === "") {
            showToast("Please fill in all fields");
            return;
        }

        onSaveEntry({ ...values, id: Date.now() });

        showToast("StockCard take saved");
        setValues(emptyValues()); // clear the form for the next entry
    }

    return (
        <div className="relative">
            <StockCard values={values} onChange={setValues} />
            <Buttons onSave={handleSave} />

            {toast && (
                <div className="fixed top-3.5 left-1/2 -translate-x-1/2 rounded-md bg-slate-800 px-4 py-2.5 text-sm text-white shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
}