import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WebScreen from "./web-screen";
import CameraScreen from "./camera-screen";
import ViewPictureScreen from "./view-picture-screen";
import { useState } from "react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Web");
  const [injectedJavaScript, setInjectedJavaScript] = useState("");
  const [capturedPicture, setCapturedPicture] = useState(null);

  function changeScreen(screen) {
    setCurrentScreen(screen);
  }

  function injectJavaScript(js) {
    setInjectedJavaScript(js);
  }

  function setPicture(picture) {
    setCapturedPicture(picture);
  }

  if (currentScreen === "Web") {
    return (
      <WebScreen changeScreen={changeScreen} js={injectedJavaScript} />
    );
  }

  if (currentScreen === "Camera") {
    return (
      <CameraScreen changeScreen={changeScreen} injectJavaScript={injectJavaScript} setPicture={setPicture} />
    );
  }

  if (currentScreen === "View Picture") {
    return (
      <ViewPictureScreen changeScreen={changeScreen} capturedPicture={capturedPicture} injectJavaScript={injectJavaScript} />
    );
  }
}