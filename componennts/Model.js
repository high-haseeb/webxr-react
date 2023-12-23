"use client";
import { useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";

const Model = ({ modelPath }) => {
  const group = useRef();
  const { nodes } = useGLTF(modelPath);

  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { duration: 1000 },
  }));

  const handleButtonClick = () => {
    console.log("rotating");
    api.start({
      rotation: [0, Math.PI * 2, 0],
      onRest: () => api.start({ rotation: [0, 0, 0], reset: true }),
    });
  };
  console.log(spring.rotation);
  return (
    <>
      <animated.group
        ref={group}
        dispose={null}
        rotation={spring.rotation}
      >
        {/* Render the first node found */}
        {nodes && Object.values(nodes)[0] && (
          <primitive object={Object.values(nodes)[0]} />
        )}
      </animated.group>
    </>
  );
};

export default Model;
