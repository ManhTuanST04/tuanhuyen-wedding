import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import _ from 'lodash';
import { FirestoreWishService } from '../../../services/firestore-wish.service';
import { BadWordService } from '../../../services/bad-word.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wish',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './wish.component.html',
    styleUrl: './wish.component.css'
})
export class WishComponent {
    items: any[] = [];
    username: FormControl;
    message: FormControl;
    wishForm: FormGroup;

    constructor(
        private firestoreService: FirestoreWishService,
        private badWordService: BadWordService,
        private toastr: ToastrService
    ) {
        this.username = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
        ]);
        this.message = new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(250)
        ]);
        this.wishForm = new FormGroup({
            username: this.username,
            message: this.message
        });
    }

    ngOnInit(): void {
        this.loadItems();
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

        if (messageWish.length < 10 || messageWish.length > 250) return false;

        return true;
    };

    async onSubmit() {
        let formData = this.wishForm.value;
        if (!this.isSuccessData(formData)) return;

        let messageWish = formData.message.trim();
        if (!_.isEmpty(messageWish)) {
            let res = this.badWordService.isContainBadWord(messageWish);
            console.log('isContainBadWord => ', res);
            if (res) {
                this.wishForm.reset();

                alert('Hãy viết những lời chúc tốt đẹp nhất nhé!');
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
}
