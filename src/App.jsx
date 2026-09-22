import { useState, useEffect } from "react";
import {
    Stock,
    Summary
} from "./pages";

const STORAGE_KEY = "stocktake_entries";

// Read whatever was saved last time the app ran.
// Runs once, lazily, when useState first initialises.
function loadEntries() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        // Storage blocked, full, or holding corrupt data — start clean
        // rather than crashing the whole app.
        return [];
    }
}

export default function App() {
    // Passing a FUNCTION to useState (not loadEntries()) means React
    // only calls it on the first render, not on every re-render.
    const [entries, setEntries] = useState(loadEntries);
    const [view, setView] = useState("form"); // "form" | "summary"
    const [isEditingEntry, setIsEditingEntry] = useState(false);

    // Every time "entries" changes, write the new list back to storage.
    // useEffect runs after the render that changed it.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        } catch {
            // Out of space or private mode — data stays in memory at least.
        }
    }, [entries]);

    function addEntry(entry) {
        setEntries((prev) => [...prev, entry]);
    }

    // Replace one entry with its corrected version, matching on id.
    // .map keeps every other entry exactly as it was.
    function updateEntry(updated) {
        setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    }

    // Keep everything EXCEPT the entry with this id.
    function deleteEntry(id) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
    }

    function clearEntries() {
        if (confirm("Clear all saved stock takes?")) {
            setEntries([]);
        }
    }

    return (
        <div className="min-h-screen max-w-sm mx-auto bg-slate-100">
            <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <h1 className="text-[17px] font-semibold text-slate-800">
                        {view === "form" ? "New StockCard Take" : "Summary"}
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setView(view === "form" ? "summary" : "form")}
                    className="text-sm font-semibold text-sky-600"
                >
                    {view === "form" ? `View Summary (${entries.length})` : "Back to Form"}
                </button>
            </div>

            {view === "form" ? (
                <Stock onSaveEntry={addEntry} />
            ) : (
                <>
                    <Summary
                        entries={entries}
                        onUpdate={updateEntry}
                        onDelete={deleteEntry}
                        onEditingChange={setIsEditingEntry}
                    />
                    {entries.length > 0 && !isEditingEntry && (
                        <div className="px-4 py-4">
                            <button
                                type="button"
                                onClick={clearEntries}
                                className="text-sm font-semibold text-red-600"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}