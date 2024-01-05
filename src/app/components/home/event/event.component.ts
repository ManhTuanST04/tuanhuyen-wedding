import { Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import Utils from '../../../shared/utils';
import { GG_MAP_FEMALE, GG_MAP_MALE } from '../../../shared/constants';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [],
    templateUrl: './event.component.html',
    styleUrl: './event.component.css'
})
export class EventComponent {
    constructor(private calendarService: CalendarService) {}

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

    onAddEvent = () => {
        // let os = this.utilsService.getMobileOperatingSystem();
        let os = Utils.getMobileOperatingSystem();

        if (os === 'iOS') {
            // window.open('https://www.addevent.com/event/vW19740176+apple');
            this.calendarService.downloadICSFile({});
        } else {
            // window.open('https://www.addevent.com/event/vW19740176+google');
            this.calendarService.downloadICSFile({});
        }
    };
}
