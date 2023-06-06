import { View, ImageBackground, TouchableOpacity, Text, StyleSheet } from "react-native";
import { sendPictureToWeb } from "./bridge";

const ViewPictureScreen = ({ changeScreen, capturedPicture, injectJavaScript }) => {
    
    function choosePicture() {
        let js = sendPictureToWeb(capturedPicture);
        injectJavaScript(js);
        changeScreen("Web");
    }
    
    if (!capturedPicture) {
        return (
            <Text style={styles.text}> Loading preview... </Text>
        );
    }

    return (
        <View style={styles.cameraPreview}>
            <ImageBackground style={{ flex: 1 }} source={{ uri: capturedPicture && capturedPicture.uri }} />
            <View style={styles.cameraButtons}>
                <TouchableOpacity style={styles.cameraButton} onPress={() => changeScreen("Camera")}>
                    <Text style={styles.cameraButtonText}> Retake </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={choosePicture}>
                    <Text style={styles.cameraButtonText}> Choose </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: "60%",
        textAlign: "center"
    },
    cameraButtonText: {
        textAlign: "center",
        color: "white"
    },
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