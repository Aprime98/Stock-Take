import { useState } from "react";
import {
    StockCard
} from "../components";

export default function Summary({ entries, onUpdate, onDelete, onEditingChange }) {

    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(null);

    function startEdit(entry) {
        setEditingId(entry.id);
        setDraft(entry); // copy the entry into a working draft
        onEditingChange?.(true); // let App know editing has started
    }

    function cancelEdit() {
        setEditingId(null);
        setDraft(null);
        onEditingChange?.(false); // let App know editing has finished
    }

    function saveEdit() {
        if (!draft.route || !draft.itemName || draft.quantity === "") return;
        onUpdate(draft); // hand the corrected entry back up to App
        cancelEdit();
    }

    if (entries.length === 0) {
        return (
            <div className="px-4 py-10 text-center text-slate-500 text-sm">
                No stock takes saved yet.
            </div>
        );
    }

    return (
        <div className="divide-y divide-slate-100 bg-white">
            {entries.map((entry) =>
                entry.id === editingId ? (
                    // ---- Edit mode: reuse the raw StockCard fields ----
                    <div key={entry.id} className="bg-sky-50/40">
                        <StockCard values={draft} onChange={setDraft} />
                        <div className="flex gap-2.5 px-4 py-3">
                            <button
                                type="button"
                                onClick={saveEdit}
                                className="flex-1 rounded-md bg-sky-500 py-2.5 text-sm font-semibold text-white active:bg-sky-600"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="flex-1 rounded-md border border-slate-300 py-2.5 text-sm font-semibold text-slate-600 active:bg-slate-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    // ---- Normal display mode ----
                    <div key={entry.id} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{entry.itemName}</span>
                            <span className="text-sm text-slate-500">{entry.quantity}</span>
                        </div>
                        <div className="text-sm text-slate-500 mt-0.5">
                            {entry.route} &middot; {entry.takenOn}
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => startEdit(entry)}
                                className="text-sm font-semibold text-sky-600"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(entry.id)}
                                className="text-sm font-semibold text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}