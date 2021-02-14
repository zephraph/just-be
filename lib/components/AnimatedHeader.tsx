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

interface AnimatedHeaderProps {
  className?: string;
}

export const AnimatedHeader = ({ className }) => {
  const router = useRouter();
  const [revealText, setRevealText] = useState(false);
  return (
    <motion.span
      key="animated-header"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/");
      }}
      style={{
        fontSize: "1.75em",
      }}
      className={`whitespace-no-wrap mr-2 cursor-pointer relative bastia ${
        className ?? ""
      }`}
      onMouseEnter={() => setRevealText(true)}
      onMouseLeave={() => {
        setRevealText(false);
      }}
      initial={{ width: "128px" }}
      animate={{ width: revealText ? "216px" : "128px" }}
      layout
    >
      <span key="first-start">just</span>
      <RevealText reveal={revealText}>i</RevealText>
      <RevealText reveal={revealText}>n</RevealText>
      <motion.span
        key="last-container"
        className="absolute"
        style={{ left: "59px" }}
        initial={{ left: "59px", position: "absolute" }}
        animate={{
          left: revealText ? "88px" : "59px",
          position: "absolute",
        }}
        transition={{ ease: "easeOut", delay: revealText ? 0 : 0.2 }}
      >
        <span>be</span>
        <RevealText reveal={revealText}>n</RevealText>
        <RevealText reveal={revealText}>n</RevealText>
        <RevealText reveal={revealText}>e</RevealText>
        <RevealText reveal={revealText}>t</RevealText>
        <RevealText reveal={revealText}>t</RevealText>
      </motion.span>
    </motion.span>
  );
};
