import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";

const CameraScreen = ({ changeScreen, setPicture }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraPosition, setCameraPosition] = useState(CameraType.back);
    const [isCameraReady, setIsCameraReady] = useState(false);

    function cameraIsReady() {
        setIsCameraReady(true);
    }

    function changeCameraPosition() {
        if (cameraPosition === CameraType.back) {
            setCameraPosition(CameraType.front)
        }
        else {
            setCameraPosition(CameraType.back);
        }
    }

    async function capturePicture(cameraRef) {
        if (cameraRef && isCameraReady) {
            const options = { base64: true }
            const picture = await cameraRef.takePictureAsync(options);
            setPicture(picture);
            changeScreen("View Picture");
        }
    }

    if (!permission) {
        return (
            <Text style={styles.text}> Loading... </Text>
        );
    }

    if (permission.granted === false) {
        return (
            <View>
                <Text style={styles.text}> Please enable camera permissions to open the camera. </Text>
            </View>
        );
    }

    let camera;
    return (
        <Camera style={styles.cameraRoot} ref={(r) => camera = r} type={cameraPosition} onCameraReady={cameraIsReady}>
            <View style={styles.cameraButtons}>
                <TouchableOpacity style={styles.cameraButton} onPress={changeCameraPosition}>
                    <Text style={styles.cameraButtonText}> Flip </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={() => capturePicture(camera)}>
                    <Text style={styles.cameraButtonText}> Capture </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={() => changeScreen("Web")}>
                    <Text style={styles.cameraButtonText}> Exit </Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: "60%",
        textAlign: "center"
    },
    permission: {
        width: "60%",
        backgroundColor: "red",
        color: "white",
        marginTop: 100
    },
    cameraRoot: {
        flex: 1,
        width: "100%"
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
    cameraButtonText: {
        textAlign: "center",
        color: "white"
    }
});

export default CameraScreen;