import { Component } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import _ from 'lodash';

@Component({
    selector: 'app-wish',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './wish.component.html',
    styleUrl: './wish.component.css'
})
export class WishComponent {
    items: any[] = [];
    wishForm: FormGroup;
    username: FormControl;
    message: FormControl;

    constructor(private firestoreService: FirestoreService) {
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
        debugger;
        if (!this.wishForm.valid) return;

        let formData = this.wishForm.value;
        formData.createdAt = moment(new Date()).format('DD/MM/yyyy HH:mm:ss');

        await this.firestoreService.addItem(formData);
    }
}
