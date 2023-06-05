import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const WebScreen = ({ changeScreen, js }) => {
    
    function webButtonClicked(m) {
        const buttonType = m.nativeEvent.data;
        changeScreen(buttonType);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: "https://wrapper-ui.onrender.com/" }}
                onMessage={(m) => webButtonClicked(m)}
                injectedJavaScript={`${js}`}
            />
        </SafeAreaView>
    );
}

export default WebScreen;