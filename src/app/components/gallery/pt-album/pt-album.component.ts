import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
    selector: 'app-pt-album',
    standalone: true,
    imports: [CommonModule, LightgalleryModule],
    templateUrl: './pt-album.component.html',
    styleUrl: './pt-album.component.css',
    encapsulation: ViewEncapsulation.None
})
export class PTAlbumComponent {
    numbers1 = Array.from({ length: 34 }, (_, i) => i + 1);
    numbers2 = Array.from({ length: 35 }, (_, i) => i + 35);
    numbers3 = Array.from({ length: 29 }, (_, i) => i + 69);

    settings = {
        selector: '.lg-item',
        counter: false,
        plugins: [lgZoom, lgThumbnail]
    };
    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
    };

}
