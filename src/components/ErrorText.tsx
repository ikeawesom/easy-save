export default function ErrorText({ errorText }: { errorText: string }) {
  return (
    <div className="rounded-md w-full border-red-700 border bg-red-100 p-2">
      <p className="custom text-red-700 text-sm">{errorText}</p>
    </div>
  );
}
