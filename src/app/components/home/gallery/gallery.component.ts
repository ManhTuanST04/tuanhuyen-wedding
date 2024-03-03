import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forEach } from 'lodash';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';

export interface PhotosApi {
    albumId?: number;
    id?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
}

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, CarouselModule],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css'
})
export class GalleryComponent {
    maxImageItem = 18;
    urlBaseAlbum = 'assets/img/tuanhuyen/album';
    albumData?: any = [];

    ngOnInit() {
        this.getDataImages();
    }

    getDataImages() {
        for (let i = 0; i < this.maxImageItem; i++) {
            let imgId = i + 1;
            let item: PhotosApi = {
                albumId: 1,
                id: imgId,
                title: 'Ảnh cưới Tuấn Huyền',
                url: `${this.urlBaseAlbum}/${imgId}.jpg`,
                thumbnailUrl: `${this.urlBaseAlbum}/${imgId}.jpg`
            };

            this.albumData?.push(item);
        }
        console.log('this.albumData= ', this.albumData)
    }

    customOptions: OwlOptions = {
        nav: false,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        loop: true,
        autoplay: true,
        center: true,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    };
}
