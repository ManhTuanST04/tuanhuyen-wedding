import { Component } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent {
  items: any[] = [];

  constructor(private firestoreService: FirestoreService) { 
    
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.firestoreService.getItems().subscribe(items => {
      this.items = items;
    });
  }
}
