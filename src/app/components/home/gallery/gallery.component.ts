import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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
    maxImageItem = 8;
    urlBaseAlbum = 'assets/img/tuanhuyen/album';
    albumData?: any = [];

    ngOnInit() {
        this.getDataImages();
    }

    getDataImages() {
        let imgList = this.getRandomImages();
        for (const item of imgList) {
            let img: PhotosApi = {
                albumId: 1,
                id: item,
                title: 'Ảnh cưới Tuấn Huyền',
                url: `${this.urlBaseAlbum}/${item}.jpg`,
                thumbnailUrl: `${this.urlBaseAlbum}/${item}.jpg`
            };

            this.albumData?.push(img);
        }
        console.log('this.albumData= ', this.albumData)
    }

    getRandomImages() {
        var numbers = [];
        
        while (numbers.length < this.maxImageItem) {
            var randomNum = Math.floor(Math.random() * 18) + 1;
            
            if (numbers.indexOf(randomNum) === -1) {
                numbers.push(randomNum);
            }
        }
    
        return numbers;
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
                items: 5
            }
        }
    };
}
