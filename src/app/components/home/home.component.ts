import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EventComponent } from './event/event.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GuestComponent } from './guest/guest.component';
import { MoneyComponent } from './money/money.component';
import { MusicComponent } from './music/music.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoryComponent } from './story/story.component';
import { WishComponent } from './wish/wish.component';
import { LightGalleryComponent } from "./light-gallery/light-gallery.component";

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
    GuestComponent,
    MoneyComponent,
    CommonModule,
    LightGalleryComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    guest: any = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        let guestParam = this.route.snapshot.queryParams['g'];

        if (guestParam) {
            // this.guest = Utils.AESDecrypt(guestParam, SECRET_KEY);
            this.guest = guestParam;
        }
    }
}
