import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Switch2() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div
      className={`peer inline-flex h-[30px] w-[50px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
        isOn ? 'bg-orange200' : 'bg-gray200'
      }`}
      onClick={toggleSwitch}
    >
      <motion.div
        className="pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0"
        layout
        animate={{
          x: isOn ? 22 : 0,
        }}
        transition={spring}
      />
    </div>
  );
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
