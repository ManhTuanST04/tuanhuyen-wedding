import { Component, ElementRef, ViewChild } from '@angular/core';
import Utils from '../../../shared/utils';
import { SECRET_KEY } from '../../../shared/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-invitation',
    standalone: true,
    imports: [],
    templateUrl: './invitation.component.html',
    styleUrl: './invitation.component.css'
})
export class InvitationComponent {
    @ViewChild('input') input!: ElementRef;
    @ViewChild('output') output!: ElementRef;

    constructor(
        private toastr: ToastrService
    ) {

    }

    onClickGenerate = () => {
        let inputValue = this.input.nativeElement.value;

        let outputValue = '';
        if(inputValue) {
            outputValue = Utils.AESEncrypt(inputValue, SECRET_KEY);
        }

        this.output.nativeElement.value = outputValue;
    }

    onClickCopy = () => {
        let outputValue = this.output.nativeElement.value;
        navigator.clipboard.writeText(outputValue);

        this.toastr.success("Copied to clipboard!");
    }
}
