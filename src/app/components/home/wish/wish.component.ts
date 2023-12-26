import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import _ from 'lodash';
import { FirestoreWishService } from '../../../services/firestore-wish.service';
import { BadWordService } from '../../../services/bad-word.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wish',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule ],
    templateUrl: './wish.component.html',
    styleUrl: './wish.component.css'
})
export class WishComponent {
    // private modalService = inject(NgbModal);
    items: any[] = [];
    wishForm: FormGroup;
    username: FormControl;
    message: FormControl;

    constructor(
        private firestoreService: FirestoreWishService,
        private badWordService: BadWordService,
        private toastr: ToastrService
    ) {
        this.username = new FormControl('');
        this.message = new FormControl('');

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

    async onSubmit() {
        if (!this.wishForm.valid) return;

        let formData = this.wishForm.value;
        let messageWish = formData.message;

        if (!_.isEmpty(messageWish)) {
            let res = this.badWordService.isContainBadWord(messageWish);
            console.log('isContainBadWord => ', res);
            if(res) {
                this.wishForm.reset();

                alert('Hãy viết những lời chúc tốt đẹp nhất nhé!');
                return;
            }
        }
        formData.createdAt = moment(new Date()).format('DD/MM/yyyy HH:mm:ss');

        await this.firestoreService.addItem(formData);
        this.wishForm.reset();
    }

    opentToast () {
        try {
            this.toastr.success('Hello world!', 'Toastr fun!');
        } catch (err) {
            console.log(err)
        }
    }
}
