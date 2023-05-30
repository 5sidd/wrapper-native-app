import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import WebView from 'react-native-webview';
import { useState, useRef } from 'react';
import { Camera, FlashMode, CameraType } from 'expo-camera';

export default function App() {
  //In URI section you need to enter your specific IP address instead of localhost
  //Find your IP address using the details of your wifi

  const [startCamera, setStartCamera] = useState(false);
  const [flashOn, setFlashOn] = useState("off");
  const [cameraPosition, setCameraPosition] = useState(CameraType.back);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [injectedJavaScript, setInjectedJavaScript] = useState("");

  async function cameraInitiation() {
    let permission = await Camera.requestCameraPermissionsAsync();
    if (permission.status === "granted") {
      setStartCamera(true);
    }
    else {
      Alert.alert("Please enable camera permissions to take pictures.");
    }
  }

  function onMessage(m) {
    console.log("Ready to execute camera function");
    cameraInitiation();
  }

  function changeCameraPosition() {
    if (cameraPosition === CameraType.back) {
      setCameraPosition(CameraType.front);
    }
    else {
      setCameraPosition(CameraType.back);
    }
  }

  function toggleFlash() {
    if (flashOn === "off") {
      setFlashOn("on");
    }
    else {
      setFlashOn("off");
    }
  }

  async function capturePicture(camera) {
    if (camera) {
      const options = { base64: true }
      const picture = await camera.takePictureAsync(options);
      //console.log(picture);
      setPictureTaken(true);
      setCapturedPicture(picture);
    }
  }

  function retakePicture() {
    setPictureTaken(false);
    setCapturedPicture(null);
  }

  function getInjectedJavaScript(source) {
    return `(function() {
      document.getElementById("chosen-image").src = '${source}'
    })();`;
  }

  function choosePicture() {
    //console.log(pictureSource);
    console.log("choosing...");
    if (capturedPicture) {
      console.log("done");
      const pictureSource = `data:image/jpg;base64,${capturedPicture.base64}`;
      const source = getInjectedJavaScript(pictureSource);
      setInjectedJavaScript(source);
      setStartCamera(false);
      setPictureTaken(false);
      setCapturedPicture(null);
    }
  }

  const CameraUI = () => {
    if (pictureTaken === false) {
      let camera;
      return (
        <Camera style={{ flex: 1, width: "100%" }} ref={(r) => camera = r} type={cameraPosition} flashMode={flashOn}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity style={styles.cameraButton} onPress={changeCameraPosition}>
              <Text style={{ textAlign: "center", color: "white" }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={() => capturePicture(camera)}>
              <Text style={{ textAlign: "center", color: "white" }}> Capture </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleFlash}>
              <Text style={{ textAlign: "center", color: "white" }}> Flash {(flashOn === "on") ? "off" : "on"} </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      );
    }

    return (
      <View style={styles.cameraPreview}>
        <ImageBackground style={{ flex: 1 }} source={{ uri: capturedPicture && capturedPicture.uri }} />
        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.cameraButton} onPress={retakePicture}>
            <Text style={{ textAlign: "center", color: "white" }}> Retake </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={choosePicture}>
            <Text style={{ textAlign: "center", color: "white" }}> Choose </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //http://127.0.0.1:3000/

  if (startCamera === true) {
    return (<CameraUI />);
  }

  //Sabre IP: 10.16.167.201
  //Home IP: 192.168.1.252
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        injectedJavaScript={`${injectedJavaScript}`}
        source={{ uri: "http://10.16.167.201:3000/" }}
        onMessage={(m) => onMessage(m)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    backgroundColor: "red",
    width: "30%"
  },
  cameraButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    position: "absolute",
    bottom: "10%"
  },
  cameraPreview: {
    background: "transparent",
    flex: 1,
    width: "100%",
    height: "100%"
  }
});