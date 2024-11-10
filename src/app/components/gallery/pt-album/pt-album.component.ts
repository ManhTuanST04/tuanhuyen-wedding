import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import { FooterComponent } from '../../home/footer/footer.component';
import { MusicComponent } from '../../home/music/music.component';

@Component({
    selector: 'app-pt-album',
    standalone: true,
    imports: [CommonModule, LightgalleryModule, FooterComponent, MusicComponent],
    templateUrl: './pt-album.component.html',
    styleUrl: './pt-album.component.css',
    encapsulation: ViewEncapsulation.None
})
export class PTAlbumComponent {
    @ViewChild('appMusic') appMusic!: MusicComponent;

    numbers1 = Array.from({ length: 34 }, (_, i) => i + 1);
    numbers2 = Array.from({ length: 35 }, (_, i) => i + 35);
    numbers3 = Array.from({ length: 29 }, (_, i) => i + 69);

    settings = {
        selector: '.lg-item',
        counter: false,
        plugins: [lgZoom]
    };
    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
    };

    scrollToBottom() {
        this.appMusic.playMusic();

        const duration = 100000; // Thời gian cuộn (2 phút)
        const targetPosition = document.body.scrollHeight;
        const startPosition = window.pageYOffset;
        let startTime: number | null = null;

        function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime;

            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);

            // Kiểm tra nếu đã cuộn đến đáy hoặc vượt qua đáy
            if (run >= targetPosition) {
                window.scrollTo(0, targetPosition);
                return; // Dừng việc cuộn lại khi đạt đáy
            }

            window.scrollTo(0, run);

            // Nếu chưa đến cuối trang, tiếp tục yêu cầu cuộn
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Hàm easing để tạo hiệu ứng cuộn mượt mà
        function ease(t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        // Bắt đầu cuộn
        requestAnimationFrame(animation);
    }
}
