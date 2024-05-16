import { useInView } from "react-intersection-observer";

const AnimatedLeft = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`animated ${inView ? "slide-in-left" : ""}`}>
      {children}
    </div>
  );
};

export default AnimatedLeft;
