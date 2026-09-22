export default function Buttons({ onSave }) {
    return (
        <div className="flex gap-2.5 border-t border-slate-200 bg-white px-4 py-3">
            <button
                type="button"
                onClick={onSave}
                className="flex-1 rounded-md bg-sky-500 py-3 text-[15px] font-semibold text-white active:bg-sky-600"
            >
                Save
            </button>
        </div>
    );
}