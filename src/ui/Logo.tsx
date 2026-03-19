import React from "react";
import { motion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
};

export const Logo: React.FC<Props> = ({ size = "md" }) => {
  const classes =
    size === "sm"
      ? "h-6 md:h-8"
      : size === "lg"
      ? "h-14 md:h-16"
      : "h-8 md:h-10";
  return (
    <motion.img
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      src="/LogoM.png"
      alt="Marea Alta"
      className={`${classes} w-auto object-contain`}
      decoding="async"
      loading="eager"
    />
  );
};
