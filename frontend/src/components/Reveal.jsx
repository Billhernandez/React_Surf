import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", delay = 0, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
