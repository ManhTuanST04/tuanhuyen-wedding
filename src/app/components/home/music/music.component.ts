import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './music.component.html',
    styleUrl: './music.component.css'
})
export class MusicComponent {
    audio: any;
    isAudioPlaying: boolean = false;
    songPlaying: any;

    constructor(private toastr: ToastrService) {
        this.audio = new Audio();
    }

    randomSong(): Object {
        const randomIndex = Math.floor(Math.random() * SONG_LIST.length);
        return SONG_LIST[randomIndex];
    }

    playMusic(): void {
        if (!this.audio.paused) {
            this.audio.pause();
            this.isAudioPlaying = false;
            this.songPlaying = '';
        } else {
            let song: any = this.randomSong();
            this.audio.src = `assets/music/${song.name}`;
            this.audio.load();
            this.audio.play();
            this.isAudioPlaying = true;
            this.songPlaying = song;

            this.toastr.success(
                `Đang phát ${song.displayName}`,
                '',
                {
                    progressBar: true,
                    progressAnimation: 'decreasing',
                    positionClass: 'toast-bottom-center'
                }
            );
        }
    }
}

const SONG_LIST = [
    {
        name: 'ido.mp3',
        displayName: 'Cưới Nhau Đi'
    },
    {
        name: 'Beautiful In White.mp3',
        displayName: 'Beautiful In White'
    },
    {
        name: 'Until You.mp3',
        displayName: 'Until You'
    },
    {
        name: 'Ngay Cuoi.mp3',
        displayName: 'Ngày Cưới'
    },
    {
        name: 'Roi Toi Luon.mp3',
        displayName: 'Rồi Tới Luôn'
    },
    {
        name: 'Mot Nha.mp3',
        displayName: 'Một Nhà'
    },
    {
        name: 'Gap Doi Yeu Thuong.mp3',
        displayName: 'Gấp Đôi Yêu Thương'
    },
    {
        name: 'Yeu Em Hon Moi Ngay.mp3',
        displayName: 'Yêu Em Hơn Mỗi Ngày'
    },
    {
        name: 'Dam Cuoi Nhu Mo Remix.mp3',
        displayName: 'Đám Cưới Như Mơ'
    },
    {
        name: 'Mot Nha.mp3',
        displayName: 'Một Nhà'
    }
];