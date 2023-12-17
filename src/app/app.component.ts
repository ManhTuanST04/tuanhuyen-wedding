import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tuanhuyen-wedding';

  item$: Observable<any>;
  firestore: Firestore = inject(Firestore);

  constructor(private contexts: ChildrenOutletContexts) {
    const itemCollection = collection(this.firestore, 'user');
    this.item$ = collectionData(itemCollection);

    this.item$.subscribe(data => {
      console.log("item =>>>", data);
    });
    

  }
}
