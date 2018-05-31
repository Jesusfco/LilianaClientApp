import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { AlbumComponent } from './album/album.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'myAlbums', component: MyAlbumsComponent },

    { path: 'album/:id', component: AlbumComponent, 
        children: [
            { path: 'show/:id', component: PhotoViewComponent },

        ] 
    },
    
    { path: '**', component:  PageNotFoundComponent },
];