import { useInView } from "react-intersection-observer";

const AnimatedRight = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} className={`animated ${inView ? "slide-in-right" : ""}`}>
      {children}
    </div>
  );
};

export default AnimatedRight;
