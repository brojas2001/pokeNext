import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  return (
    <>
      {/* <button
        className="absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Detalles
      </button> */}
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-20 relative flex rounded-3xl bg-[#0984e3] p-8 justify-center gap-4 m-4 w-[380px] h-[320px] rounded-lg shadow-lg relative flex flex-col  bg-blue-600 ">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <h3 className="text-3xl font-bold justify-items-stretch">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                  <div>
                    Hola
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;