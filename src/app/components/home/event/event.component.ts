import { Component } from '@angular/core';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [],
    templateUrl: './event.component.html',
    styleUrl: './event.component.css'
})
export class EventComponent {
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
}
