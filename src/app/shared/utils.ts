import { OPERATION_SYSTEM } from './constants';
import DEFAULT_BLACKLIST from './bad-word.json'
import _ from 'lodash';

export default class Utils {
    public static getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return OPERATION_SYSTEM.WINDOWS_PHONE;
        }

        if (/android/i.test(userAgent)) {
            return OPERATION_SYSTEM.ANDROID;
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            return OPERATION_SYSTEM.IOS;
        }

        return OPERATION_SYSTEM.OTHER;
    };

    public static isContainBadWord(text: string) {
        if (_.isEmpty(text)) return true;

        const regexp = new RegExp(
            `(\\s|^)(\\b${DEFAULT_BLACKLIST.join('\\b|\\b')}\\b)(\\s|$)`,
            'gi'
        );
		text = text.normalize();

        return regexp.test(text);
    }
}
