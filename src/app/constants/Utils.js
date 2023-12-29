import Constants from './Constants';

export class Utils {
    getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return Constants.OPERATION_SYSTEM.WINDOWS_PHONE;
        }

        if (/android/i.test(userAgent)) {
            return OPERATION_SYSTEM.ANDROID;
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return OPERATION_SYSTEM.IOS;
        }

        return OPERATION_SYSTEM.OTHER;
    };
}
