import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import _ from 'lodash';
import { FirestoreWishService } from '../../../services/firestore-wish.service';
import { ToastrService } from 'ngx-toastr';
import Utils from '../../../shared/utils';

@Component({
    selector: 'app-wish',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './wish.component.html',
    styleUrl: './wish.component.css'
})
export class WishComponent {
    messageMaxlength: number = 1000;

    items: any[] = [];
    username!: FormControl;
    message!: FormControl;
    wishForm!: FormGroup;

    constructor(
        private firestoreService: FirestoreWishService,
        private toastr: ToastrService
    ) {

    }

    ngOnInit(): void {
        this.loadItems();

        this.username = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
        ]);
        this.message = new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(this.messageMaxlength)
        ]);
        this.wishForm = new FormGroup({
            username: this.username,
            message: this.message
        });
    }

    loadItems(): void {
        this.firestoreService.getItems().subscribe((items) => {
            this.items = _.orderBy(items, ['createdAt'], ['desc']);
        });
    }

    isSuccessData = (data: any) => {
        if (!this.wishForm.valid) return false;

        let username = data.username.trim();
        let messageWish = data.message.trim();

        if (username.length < 2 || username.length > 30) return false;

        if (messageWish.length < 10 || messageWish.length > this.messageMaxlength) return false;

        return true;
    };

    async onSubmit() {
        let formData = this.wishForm.value;
        if (!this.isSuccessData(formData)) {
            return;
        };

        let messageWish = formData.message.trim();
        if (!_.isEmpty(messageWish)) {
            let res = Utils.isContainBadWord(messageWish);
            console.log('isContainBadWord => ', res);
            if (res) {
                this.wishForm.reset();

                alert('Không gửi được do chứa từ ngữ hạn chế!');
                return;
            }
        }
        formData.createdAt = moment(new Date()).format('yyyy/MM/DD HH:mm:ss');

        await this.firestoreService.addItem(formData);
        this.wishForm.reset();

        this.openToast();
    }

    openToast() {
        try {
            this.toastr.success(
                'Tuấn Huyền cảm ơn lời chúc của bạn ạ',
                'Gửi lời chúc thành công!',
                {
                    progressBar: true,
                    progressAnimation: 'decreasing'
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    formatDateTime(originalDate : string) {
        return moment(originalDate, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
    }
}
