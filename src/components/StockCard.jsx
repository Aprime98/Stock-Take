const ROUTES = [
    "R1 - Limuru",
    "R2 - Ngecha",
    "R3 - Rironi",
    "R4 - Tiekunu",
];

export default function Stock({ values, onChange }) {
    const handle = (field) => (e) => onChange({ ...values, [field]: e.target.value });

    return (
        <form className="divide-y divide-slate-100 bg-white">
            <div className="px-4 py-3">
                <label htmlFor="route" className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Route
                </label>
                <select
                    id="route"
                    required
                    value={values.route}
                    onChange={handle("route")}
                    className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                >
                    <option value="" disabled>
                        Select...
                    </option>
                    {ROUTES.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>

            <div className="px-4 py-3">
                <label htmlFor="itemName" className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Item Name
                </label>
                <input
                    id="itemName"
                    type="text"
                    required
                    placeholder="e.g. Milk Cans"
                    value={values.itemName}
                    onChange={handle("itemName")}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                />
            </div>

            <div className="px-4 py-3">
                <label htmlFor="takenOn" className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Taken On
                </label>
                <input
                    id="takenOn"
                    type="date"
                    required
                    value={values.takenOn}
                    onChange={handle("takenOn")}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                />
            </div>

            <div className="px-4 py-3">
                <label htmlFor="quantity" className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Quantity
                </label>
                <input
                    id="quantity"
                    type="number"
                    inputMode="decimal"
                    required
                    placeholder="0"
                    value={values.quantity}
                    onChange={handle("quantity")}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                />
            </div>
        </form>
    );
}