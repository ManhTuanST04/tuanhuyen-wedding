import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { CalendarService } from '../../../services/calendar.service';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [],
    templateUrl: './event.component.html',
    styleUrl: './event.component.css'
})
export class EventComponent {
    constructor(private utilsService: UtilsService, private calendarService: CalendarService) {

    }

    onOpenMap(gender: string): void {
        if (!gender) return;

        let mapLink = '';
        if (gender === 'male') {
            mapLink = 'https://maps.app.goo.gl/Bt6NfSEqjiQGjywYA';
        } else {
            mapLink = 'https://maps.app.goo.gl/Ga5wz15S43QsBcAW8';
        }

        window.open(mapLink);
    }

    onAddEvent = () => {
        let os = this.utilsService.getMobileOperatingSystem();

        if(os === 'iOS') {
            // window.open('https://www.addevent.com/event/vW19740176+apple');
            this.calendarService.downloadICSFile({});
        } else {
            window.open('https://www.addevent.com/event/vW19740176+google');
        }
    }
    
}
