import { createPortal } from "react-dom";
import { motion } from "framer-motion";
// import textureBg from "../assest/texture-background.png";

interface Drawer {
  position: "left" | "right" | "top";
  children: React.ReactNode;
  open: boolean;
  customClass?: string[];
  onClose: () => void;
  shadowNode: boolean;
}

const Drawer = (props: Drawer) => {
  let className =
    "fixed top-0 z-40 overflow-y-auto transition-transform bg-gradient-to-br from-[#5e5a54] to-[#4b4842] bg-cover duration-500 ease-in-out ";
  if (props.position === "left") {
    className += "w-3/4 lg:w-2/6 h-screen left-0 shadow-md-right ";
  } else if (props.position === "right") {
    className += "w-3/4 lg:w-2/6 h-screen right-0 shadow-md-left ";
  } else if (props.position === "top") {
    className += "left-0 right-0 h-[calc(100%-11rem)] shadow-md ";
  }

  if (props.customClass) {
    props.customClass.forEach((classNameStr) => {
      className += ` ${classNameStr + "!important"}`;
    });
  }

  let translateXFull = "-translate-x-full";
  if (props.position === "right") {
    translateXFull = "translate-x-full";
  }
  if (props.position === "top") {
    translateXFull = "-translate-y-full";
  }

  return (
    <>
      <div
        // style={{ backgroundImage: `url(${textureBg})` }}
        className={`${className} ${props.open ? "" : translateXFull}`}
      >
        {props.children}
      </div>

      {props.shadowNode &&
        props.open &&
        createPortal(
          <motion.div
            animate={{ opacity: 1 }}
            initial={{
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-gray-900 bg-opacity-90 fixed inset-0 z-30"
            onClick={() => {
              props.onClose();
            }}
          ></motion.div>,
          document.body
        )}
    </>
  );
};

export default Drawer;
