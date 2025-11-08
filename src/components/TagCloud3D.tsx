import { useEffect, useRef } from "react";

const TagCloud3D = () => {
  const cloudRef = useRef<HTMLDivElement>(null);

  const tags = [
    "Innovation",
    "Leadership",
    "Education",
    "Mentorship",
    "Community",
    "Excellence",
    "Growth",
    "Impact",
    "Future",
    "Scholars",
    "Empowerment",
    "Learning",
    "Success",
    "Opportunity",
    "Vision",
  ];

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const items = cloud.querySelectorAll<HTMLSpanElement>(".tag-item");
    const radius = 180;
    let angleX = 0;
    let angleY = 0;

    // Position items in 3D sphere
    items.forEach((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / items.length);
      const theta = Math.sqrt(items.length * Math.PI) * phi;

      item.style.transform = `translate3d(0, 0, ${radius}px) rotateX(${
        (theta * 180) / Math.PI
      }deg) rotateY(${(phi * 180) / Math.PI}deg)`;
    });

    // Auto-rotate animation
    let animationId: number;
    const animate = () => {
      angleY += 0.3;
      angleX += 0.1;

      cloud.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cloud.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      angleY = x * 50;
      angleX = -y * 50;
    };

    cloud.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      cloud.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div
        ref={cloudRef}
        className="relative w-full h-full preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(800px)",
        }}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="tag-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all hover:scale-125"
            style={{
              transformStyle: "preserve-3d",
              backgroundColor: `hsl(${225 + index * 15}, ${70 + (index % 3) * 10}%, ${
                45 + (index % 4) * 5
              }%)`,
              color: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagCloud3D;
