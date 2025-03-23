import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../../../services/calendar.service';

@Component({
    selector: 'app-anniversary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './anniversary.component.html',
    styleUrl: './anniversary.component.css'
})
export class AnniversaryComponent {
    constructor(
        private calendarService: CalendarService,
        private toastr: ToastrService
    ) { }

    ngAfterViewInit() {
        this.toastr.success(
            'Chúc mừng 1 năm ngày cưới',
            '1 Year Anniversary',
            {
                progressBar: true,
                progressAnimation: 'decreasing'
            }
        );
    }
    
}
