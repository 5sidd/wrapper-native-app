import { Alert } from "react-native";

function sendPictureToWeb(capturedPicture) {
    if (capturedPicture) {
        const pictureSource = `data:image/jpg;base64,${capturedPicture.base64}`;

        const injectedJavaScript = `
        (function() {
            document.getElementById("chosen-image").src = '${pictureSource}'
          })();
        `;

        return injectedJavaScript;
    }
}

export { sendPictureToWeb };