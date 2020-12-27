import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const initial = { opacity: 0 };

const RevealText = ({ reveal, children, ...props }) => {
  return (
    <AnimatePresence>
      {reveal && (
        <motion.span
          initial={initial}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={initial}
          {...props}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export const AnimatedHeader = () => {
  const router = useRouter();
  const [revealText, setRevealText] = useState(false);
  return (
    <motion.span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/");
      }}
      className="whitespace-no-wrap text-4xl mr-2 font-thin text-gray-800 cursor-pointer relative"
      onMouseEnter={() => setRevealText(true)}
      onMouseLeave={() => {
        setRevealText(false);
      }}
      initial={{ width: "128px" }}
      animate={{ width: revealText ? "216px" : "128px" }}
      layout
    >
      <span>Just</span>
      <RevealText reveal={revealText}>i</RevealText>
      <RevealText reveal={revealText}>n</RevealText>
      <motion.span
        key="last-container"
        className="absolute"
        initial={{ left: "75px", position: "absolute" }}
        animate={{ left: revealText ? "100px" : "75px", position: "absolute" }}
        transition={{ ease: "easeOut", delay: revealText ? 0 : 0.2 }}
      >
        <span>Be</span>
        <RevealText reveal={revealText}>n</RevealText>
        <RevealText reveal={revealText}>n</RevealText>
        <RevealText reveal={revealText}>e</RevealText>
        <RevealText reveal={revealText}>t</RevealText>
        <RevealText reveal={revealText}>t</RevealText>
      </motion.span>
    </motion.span>
  );
};
