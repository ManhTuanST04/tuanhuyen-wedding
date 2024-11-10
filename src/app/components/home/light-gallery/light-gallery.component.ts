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
	selector: 'app-light-gallery',
	standalone: true,
	imports: [LightgalleryModule],
	templateUrl: './light-gallery.component.html',
	styleUrl: './light-gallery.component.css',
	encapsulation: ViewEncapsulation.None
})
export class LightGalleryComponent {
	settings = {
		selector: '.lg-item',
		counter: false,
		plugins: [lgZoom, lgThumbnail]
	};
	onBeforeSlide = (detail: BeforeSlideDetail): void => {
		const { index, prevIndex } = detail;
		console.log(index, prevIndex);
	};
}
