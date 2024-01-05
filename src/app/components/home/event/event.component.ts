import { Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import Utils from '../../../shared/utils';
import { EVENT_INFO_FEMALE, EVENT_INFO_MALE, GG_MAP_FEMALE, GG_MAP_MALE, OPERATION_SYSTEM } from '../../../shared/constants';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [],
    templateUrl: './event.component.html',
    styleUrl: './event.component.css'
})
export class EventComponent {
    constructor(private calendarService: CalendarService) { }

    onOpenMap(gender: string): void {
        if (!gender) return;

        let mapLink = '';
        if (gender === 'male') {
            mapLink = GG_MAP_MALE;
        } else {
            mapLink = GG_MAP_FEMALE;
        }

        window.open(mapLink);
    }

    onAddEvent = (gender: string) => {
        let os = Utils.getMobileOperatingSystem();

        if (gender === 'male') {
            if (os === OPERATION_SYSTEM.IOS) {
                // window.open('https://www.addevent.com/event/vW19740176+apple');
                this.calendarService.downloadICSFile(EVENT_INFO_MALE);
            } else {
                window.open('https://www.addevent.com/event/vW19740176+google');
            }
        } else {
            if (os === OPERATION_SYSTEM.IOS) {
                this.calendarService.downloadICSFile(EVENT_INFO_FEMALE);
            } else {
                window.open('https://www.addevent.com/event/vW19740176+google');
            }
        }
    };
    
}
