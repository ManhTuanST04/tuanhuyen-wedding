import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PTAlbumComponent } from './components/gallery/pt-album/pt-album.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { path: 'pt-album', component: PTAlbumComponent },
];
