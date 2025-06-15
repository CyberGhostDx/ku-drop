import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BusStop } from "@/types";
import { AdvancedMarker } from "react-google-map-wrapper";
import BusStopIcon from "@/components/Icons/BusStopIcon";

type BusStopSignProps = {} & BusStop;

const BusStopSign: React.FC<BusStopSignProps> = ({ lat, lng, signName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const infoVariants = {
    initial: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <AdvancedMarker lat={lat} lng={lng} title={signName} onClick={handleClick}>
      <div className="flex flex-col items-center">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={infoVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="py-1 px-2 rounded-lg bg-primary-500 text-white mb-1 text-lg drop-shadow-lg"
            >
              {signName}
            </motion.div>
          )}
        </AnimatePresence>
        <BusStopIcon size={42} />
      </div>
    </AdvancedMarker>
  );
};

export default BusStopSign;
