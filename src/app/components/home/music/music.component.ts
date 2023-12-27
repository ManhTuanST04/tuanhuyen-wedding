import { Component } from '@angular/core';

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [],
    templateUrl: './music.component.html',
    styleUrl: './music.component.css'
})
export class MusicComponent {
    audio: any;

    constructor() {
        this.audio = new Audio();
    }

    randomSong(): string {
        const songArray = [
            'ido.mp3',
            'Beautiful In White.mp3',
            'Until You.mp3',
            'Ngay Cuoi.mp3',
            'Roi Toi Luon.mp3',
            'Mot Nha.mp3',
            'Gap Doi Yeu Thuong.mp3',
			"Yeu Em Hon Moi Ngay.mp3",
			"Dam Cuoi Nhu Mo Remix.mp3",
			"Dam Cuoi Tren Duong Que Remix.mp3",
        ];
        const randomIndex = Math.floor(Math.random() * songArray.length);
        return songArray[randomIndex];
    }

    playMusic(): void {
        if (!this.audio.paused) {
            this.audio.pause();
        } else {
            this.audio.src = `assets/music/${this.randomSong()}`;
            this.audio.load();
            this.audio.play();
        }
    }
}
