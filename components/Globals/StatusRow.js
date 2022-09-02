export default function StatusRow({ active }) {
  return (
    <div>
      {active ? (
        <div className="bg-green-400 text-green-800 py-1 px-2  rounded-xl">
          <span>active</span>
        </div>
      ) : (
        <div className="bg-red-400 text-red-800 py-1 px-2  rounded-xl">
          <span>disabled</span>
        </div>
      )}
    </div>
  );
}
