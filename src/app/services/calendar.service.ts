import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    constructor() { }

    downloadICSFile(eventData: any) {
        const icsContent = `BEGIN:VCALENDAR
PRODID:-//Tuấn Huyền Wedding//tuanhuyenwedding.com//EN
VERSION:2.0
BEGIN:VTIMEZONE
TZID:Asia/Ho_Chi_Minh
BEGIN:STANDARD
DTSTART:19750612T230000
TZOFFSETFROM:+0700
TZOFFSETTO:+0700
TZNAME:+07
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20240102T135028Z
STATUS:CONFIRMED
UID:tuanhuyen-wedding-id
SEQUENCE:0
DTSTART;TZID=Asia/Ho_Chi_Minh:${eventData.START_TIME}
DTEND;TZID=Asia/Ho_Chi_Minh:${eventData.END_TIME}
SUMMARY:💍Lễ Thành Hôn\\n💞Mạnh Tuấn & Khánh Huyền💞
DESCRIPTION:💍Lễ Thành Hôn Mạnh Tuấn & Khánh Huyền💍 \\nSự có mặt của bạn là niềm vinh dự với vợ chồng chúng mình ❤️\\nRất hân hạnh được đón tiếp!\\n\\n📲Liên hệ chú rể: 0377560590\\n📲Liên hệ cô dâu: 0353578378\\nWebsite: tuanhuyenwedding.info
X-ALT-DESC;FMTTYPE=text/html:Lễ Thành Hôn Mạnh Tuấn & Khánh Huyền
LOCATION:📍${eventData.LOCATION}
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'event.ics');
        document.body.appendChild(link);
        link.click();
    }
}
