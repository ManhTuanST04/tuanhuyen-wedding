import { Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import {
    DATE_COUNT_DOWN,
    EVENT_INFO_FEMALE,
    EVENT_INFO_MALE,
    GG_MAP_FEMALE,
    GG_MAP_MALE,
    OPERATION_SYSTEM
} from '../../../shared/constants';
import Utils from '../../../shared/utils';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './event.component.html',
    styleUrl: './event.component.css'
})
export class EventComponent {
    constructor(
        private calendarService: CalendarService,
        private toastr: ToastrService
    ) { }

    daysDifference: any = 0;
    isAfter: any = false;
    date: any;
    now: any;
    targetDateInput: any = DATE_COUNT_DOWN;
    targetDate: any;
    targetTime: any;
    difference: any;

    days: any = 0;
    hours: any = 0;
    minutes: any = 0;
    seconds: any = 0;

    ngAfterViewInit() {
        this.calculateDateTarget();

        if (!this.isAfter) {
            this.targetDate = new Date(this.targetDateInput?.toString());
            this.targetTime = this.targetDate.getTime();

            setInterval(() => {
                this.tickTock();
                this.difference = this.targetTime - this.now;
                this.difference = this.difference / (1000 * 60 * 60 * 24);
                this.difference = this.difference <= 0 ? 0 : this.difference;
            }, 1000);
        }

        this.checkAnniversary()
    }

    tickTock() {
        this.date = new Date();
        this.now = this.date.getTime();
        this.days = Math.floor(this.difference) ? Math.floor(this.difference) : '0';
        this.hours = 23 - this.date.getHours();
        this.minutes = 60 - this.date.getMinutes();
        this.seconds = 60 - this.date.getSeconds();
    }

    calculateDateTarget() {
        const currentDate = moment();
        const targetDate = moment(this.targetDateInput, 'YYYY-MM-DD');
        this.isAfter = currentDate.isAfter(targetDate);

        const sortedDates = [currentDate, targetDate].sort((a: any, b: any) => a - b);
        this.daysDifference = sortedDates[1].diff(sortedDates[0], 'days');
        if (this.daysDifference === 0) this.daysDifference = 1;

        console.log('this.isAfter =' + this.isAfter);
    }

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
                this.calendarService.downloadICSFile(EVENT_INFO_MALE);
            } else {
                let urlGGCalendar = this.calendarService.genGoogleCalendarLink(EVENT_INFO_MALE);
                window.open(urlGGCalendar);
            }
        } else {
            if (os === OPERATION_SYSTEM.IOS) {
                this.calendarService.downloadICSFile(EVENT_INFO_FEMALE);
            } else {
                let urlGGCalendar = this.calendarService.genGoogleCalendarLink(EVENT_INFO_FEMALE);
                window.open(urlGGCalendar);
            }
        }
    };

    // sendMail(day: string) {
    //     emailjs.init({
    //         publicKey: 'rMbl48X95JYxit86_',
    //         blockHeadless: true,
    //         limitRate: {
    //             throttle: 10000, // 10s
    //         },
    //     });

    //     const templateParams = {
    //         message: `Hôm nay là kỷ niệm ${day} ngày cưới`,
    //     };

    //     emailjs
    //         .send('service_tuanhuyenwedding', 'template_wedding', templateParams, {
    //             publicKey: 'rMbl48X95JYxit86_',
    //         })
    //         .then(
    //             (response) => {
    //                 console.log('SUCCESS!', response.status, response.text);
    //             },
    //             (err) => {
    //                 console.log('FAILED...', err);
    //             },
    //         );
    // }

    checkAnniversary() {
        const targetDate = moment(DATE_COUNT_DOWN, 'DD/MM/YYYY');
        const currentDate = moment();

        const daysDifference = currentDate.diff(targetDate, 'days');

        if (daysDifference > 0 && daysDifference % 100 === 0) {
            this.toastr.success(
                `Hôm nay là kỷ niệm ${daysDifference} ngày cưới`,
                'Ngày kỷ niệm',
                {
                    progressBar: true,
                    progressAnimation: 'decreasing'
                }
            );

            // this.sendMail(daysDifference.toString());
        }
    }
}
