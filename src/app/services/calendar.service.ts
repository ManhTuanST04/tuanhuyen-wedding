import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    constructor() {}

    downloadICSFile(eventData: any) {
        // const icsContent = `BEGIN:VCALENDAR
        //     VERSION:2.0
        //     PRODID:-//Your Company//Your App//EN
        //     CALSCALE:GREGORIAN
        //     BEGIN:VEVENT
        //     UID:${eventData.uid}
        //     DTSTAMP:${eventData.timestamp}
        //     DTSTART:${eventData.startDate}
        //     DTEND:${eventData.endDate}
        //     SUMMARY:${eventData.summary}
        //     DESCRIPTION:${eventData.description}
        //     LOCATION:${eventData.location}
        //     END:VEVENT
        //     END:VCALENDAR`;

        const icsContent = `
            BEGIN:VCALENDAR
            PRODID:-//AddEvent Inc//AddEvent.com v1.7//EN
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
            UID:d2e893fc-8949-4d27-a377-9395ee8bdbec
            SEQUENCE:0
            DTSTART;TZID=Asia/Ho_Chi_Minh:20240102T201500
            DTEND;TZID=Asia/Ho_Chi_Minh:20240102T231500
            SUMMARY:Cưới Tuấn Huyền Test
            DESCRIPTION:Sự kiện cưới hỏi nhà trai\n\n------\n\nPowered by addevent.com \nShare your next event with us!\n
            X-ALT-DESC;FMTTYPE=text/html:Sự kiện cưới hỏi nhà trai<br /><br />------<br /><br />Powered by addevent.com <br>Share your next event with us!<br>
            LOCATION:Hiền Lương\, Hạ Hòa\, Phú Thọ
            BEGIN:VALARM
            TRIGGER:-PT30M
            ACTION:DISPLAY
            DESCRIPTION:Reminder
            END:VALARM
            TRANSP:OPAQUE
            END:VEVENT
            END:VCALENDAR
        `;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'event.ics');
        document.body.appendChild(link);
        link.click();
    }
}
