import { Injectable } from '@angular/core';
import DEFAULT_BLACKLIST from '../constants/bad-word/bad-word.json';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class BadWordService {
    constructor() {}

    isContainBadWord(text: string) {
        if (_.isEmpty(text)) return true;

        const regexp = new RegExp(
            `(\\s|^)(\\b${DEFAULT_BLACKLIST.join('\\b|\\b')}\\b)(\\s|$)`,
            'gi'
        );
		text = text.normalize();

        return regexp.test(text);
    }
}
