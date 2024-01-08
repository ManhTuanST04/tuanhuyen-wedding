import * as CryptoJS from 'crypto-js';
import _ from 'lodash';
import DEFAULT_BLACKLIST from './bad-word.json';
import { OPERATION_SYSTEM } from './constants';

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

    public static AESEncrypt(plainText: string, secretKey: string): string {
        const encrypted = CryptoJS.AES.encrypt(plainText, secretKey).toString();
        return encrypted;
    }

    public static AESDecrypt(cipherText: string, secretKey: string): string {
        const decrypted = CryptoJS.AES.decrypt(cipherText, secretKey).toString(CryptoJS.enc.Utf8);
        return decrypted;
    }
}
