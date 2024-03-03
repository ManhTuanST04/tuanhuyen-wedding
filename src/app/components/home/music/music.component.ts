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
        this.audio.addEventListener('ended', () => this.onMusicEnded());
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

            this.toastr.success(`Đang phát: ${song.displayName}`, '', {
                progressBar: true,
                progressAnimation: 'decreasing',
                positionClass: 'toast-bottom-center'
            });
        }
    }

    onMusicEnded(): void {
        console.log('Ending music');
        this.isAudioPlaying = false;
        this.songPlaying = '';
    }
}

const SONG_LIST = [
    {
        name: 'ido.mp3',
        displayName: 'I do'
    },
    {
        name: 'Beautiful In White.mp3',
        displayName: 'Beautiful In White'
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
        name: 'Yeu Em Hon Moi Ngay.mp3',
        displayName: 'Yêu Em Hơn Mỗi Ngày'
    },
    {
        name: 'Dam Cuoi Nhu Mo Remix.mp3',
        displayName: 'Đám Cưới Như Mơ'
    },
    {
        name: 'Dam Cuoi Tren Duong Que Remix.mp3',
        displayName: 'Đán cưới trên đường quê'
    },
    {
        name: 'Cuoi Nhau Di.mp3',
        displayName: 'Cưới nhau đi'
    },
    {
        name: 'Nam Lay Tay Anh.mp3',
        displayName: 'Nắm Lấy Tay Anh'
    },
    {
        name: 'Ngay Dau Tien.mp3',
        displayName: 'Ngày Đầu Tiên'
    },
    {
        name: 'Lam Vo Anh Nhe.mp3',
        displayName: 'Làm Vợ Anh Nhé'
    },
    {
        name: 'My Love.mp3',
        displayName: 'My Love'
    },
    {
        name: 'Marry You.mp3',
        displayName: 'Marry You'
    },
    {
        name: 'Ta La Cua Nhau.mp3',
        displayName: 'Ta Là Của Nhau'
    },
];
