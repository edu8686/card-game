function Modal({ onClose, cerrar }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <h1 className="text-3xl font-extrabold mb-6">Game over</h1>
        <button
          onClick={onClose}
          className="bg-black text-white font-semibold px-6 py-3 rounded-full"
        >
          {cerrar}
        </button>
      </div>
    </div>
  );
}

export default Modal;
