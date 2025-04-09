import { useEffect, useState } from "react";
import Card from "../card/card";

const Modal = ({ onClose, title, children }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setIsVisible(true); // Modal becomes visible with animation
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed p-0  md:p-8 top-0 bg-[rgba(0,0,0,0.4)] z-[60] right-0 left-0 bottom-0 flex justify-center items-end md:items-center transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-fit w-full md:w-[40%] max-h-[80%] flex justify-center transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Card className="shadow-lg rounded-md opacity-1  z-50 w-[70%] min-w-[320px] relative gap-2 flex flex-col">
          <div className="flex justify-between">
            <div className="text-lg font-semibold ">{title}</div>
            <div
              className="w-6 h-6 flex justify-center  items-center font-semibold cursor-pointer"
              onClick={handleClose}
            >
              x
            </div>
          </div>
          <div className="overflow-y-auto">{children}</div>
        </Card>
      </div>
    </div>
  );
};
export default Modal;
