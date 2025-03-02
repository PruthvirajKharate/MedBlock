import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Card.css";

const Card = ({ title, count, icon }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds animation
    const increment = Math.ceil(count / (duration / 30)); // Adjust increment based on duration

    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
      <p className="count">{displayCount}</p>
    </motion.div>
  );
};

export default Card;
