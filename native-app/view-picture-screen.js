import { View, ImageBackground, TouchableOpacity, Text, StyleSheet } from "react-native";
import { sendPictureToWeb } from "./bridge";

const ViewPictureScreen = ({ changeScreen, capturedPicture, injectJavaScript }) => {
    
    function choosePicture() {
        let js = sendPictureToWeb(capturedPicture);
        injectJavaScript(js);
        changeScreen("Web");
    }

    return (
        <View style={styles.cameraPreview}>
            <ImageBackground style={{ flex: 1 }} source={{ uri: capturedPicture && capturedPicture.uri }} />
            <View style={styles.cameraButtons}>
                <TouchableOpacity style={styles.cameraButton} onPress={() => changeScreen("Camera")}>
                    <Text style={{ textAlign: "center", color: "white" }}> Retake </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={choosePicture}>
                    <Text style={{ textAlign: "center", color: "white" }}> Choose </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cameraPreview: {
        background: "transparent",
        flex: 1,
        width: "100%",
        height: "100%"
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
    }
});

export default ViewPictureScreen;