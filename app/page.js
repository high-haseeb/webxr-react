"use client";
import Model from "@/componennts/Model";
import { PresentationControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
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
  // Function to get the device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return "android";
    } else if (/iPhone/i.test(userAgent) || /iPad/i.test(userAgent)) {
      return "iphone";
    } else {
      return "desktop";
    }
  };

  // Function to generate the appropriate href based on the device type
  const generateHref = () => {
    const deviceType = getDeviceType();
    if (deviceType === "android") {
      return `intent://arvr.google.com/scene-viewer/1.0?file=${modelPath}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
    } else if (deviceType === "iphone") {
      return modelPath;
    } else {
      return "#desktopHref";
    }
  };
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="absolute bottom-4  flex items-center justify-evenly w-1/4 fa-2x pointer-events-auto cursor-pointer">
      <FontAwesomeIcon
        icon={faCube}
        onClick={() => setOpen((state) => !state)}
        title="Standard Veiws"
      />
      <FontAwesomeIcon icon={faShare} title="Share" />
      <FontAwesomeIcon icon={faExpand} title="Full Screen" />
      <StandardVeiwMenu isOpen={isOpen} onClose={() => setOpen(state => !state)} />
      <a rel="ar" id="arLink" href={generateHref()} title="Open AR">
        <FontAwesomeIcon icon={faVrCardboard} />
      </a>
    </div>
  );
};

const StandardVeiwMenu = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`absolute w-16 h-16 bg-zinc-600 ${isOpen ? "block" : "hidden"}`}
    >
      <div ref={modalRef} className="modal-content">
        <h1>Hello world</h1>
      </div>
    </div>
  );
};
