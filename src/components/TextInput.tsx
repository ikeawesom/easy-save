export default function TextInput({
  id,
  label,
  placeholder,
  onChange,
  value,
  enabled,
}: {
  value: any;
  id: string;
  label?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  enabled?: boolean;
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-500">
          {label}
        </label>
      )}
      <input
        disabled={!enabled}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
        className="w-full mt-2 rounded-md border border-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
}
