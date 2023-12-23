"use client";
import Model from "@/componennts/Model";
import { PresentationControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCircle,
  faCube,
  faExpand,
  faMessage,
  faShare,
  faVcard,
  faVideo,
  faVrCardboard,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <Canvas>
        <Stage preset={"portrait"} environment={"city"}>
          <Suspense fallback={<Html>Loading...</Html>}>
            <PresentationControls>
              <Model modelPath={"./Mixer.glb"} />
            </PresentationControls>
          </Suspense>
        </Stage>
      </Canvas>
      <TopBar modelPath={"./usdz/saeukkang.usdz"} />
      <BottomBar />
    </div>
  );
}
const TopBar = () => {
  return (
    <div className="absolute top-4 left-2 flex items-center justify-evenly w-1/4 fa-2x z-50 pointer-events-auto">
      <FontAwesomeIcon icon={faCircle} />
      <FontAwesomeIcon icon={faMessage} />
      <FontAwesomeIcon icon={faVideo} />
    </div>
  );
};

const BottomBar = ({ modelPath }) => {
  useEffect(() => {
    document
      .getElementById("arLink")
      .addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior (downloading the file)
      });
  });
  return (
    <div className="absolute bottom-4  flex items-center justify-evenly w-1/4 fa-2x ">
      <FontAwesomeIcon icon={faCube} className="" />
      <FontAwesomeIcon icon={faShare} />
      <FontAwesomeIcon icon={faExpand} />

      <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
        <a rel="ar" id="arLink" href={modelPath}>
          <FontAwesomeIcon icon={faVrCardboard} />
        </a>
      </a>
    </div>
  );
};
