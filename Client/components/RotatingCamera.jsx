import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { animate, useMotionValue } from "framer-motion";

export default function RotatingCamera() {
  const { camera } = useThree();
  const t = useMotionValue(0);

  useEffect(() => {
    const controls = animate(t, 360, {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    });
    return controls.stop;
  }, []);

  useFrame(() => {
    const angle = (t.get() * Math.PI) / 180;
    const radius = 6;

    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
