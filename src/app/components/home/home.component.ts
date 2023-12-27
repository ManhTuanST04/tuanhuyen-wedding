import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EventComponent } from './event/event.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoryComponent } from './story/story.component';
import { WishComponent } from './wish/wish.component';
import { MusicComponent } from './music/music.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    AboutComponent,
    CarouselComponent,
    EventComponent,
    FooterComponent,
    GalleryComponent,
    StoryComponent,
    WishComponent,
    MusicComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor() {
  }

}
