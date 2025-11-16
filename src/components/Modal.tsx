export function Modal({
  isOpen,
  onClose,
  children,
  allowClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  allowClose?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={allowClose ? onClose : undefined}
    >
      <div
        className="max-w-[800px] w-full p-4 bg-white rounded-xl border border-gray-100 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
