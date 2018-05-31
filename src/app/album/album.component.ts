import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { AlbumClients } from '../album-clients';
import  {AlbumPhotoClients } from '../album-photo-clients';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  observerRef: any;

  public album: AlbumClients = new AlbumClients();
  public request: Boolean = false;
  public photoChangeObserver: any;

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) { 

      this.setPhotoChangingObserver();

      this.observerRef = actRou.params.subscribe(params => {

        this.album.id = params['id'];
        this.getPhotos();
        
      });

    }

  ngOnInit() {
  }

  setPhotoChangingObserver() {
    this.photoChangeObserver = setInterval(() => this.photoChanguingObserverLogic(), 200);
  }

  photoChanguingObserverLogic() {
    if(sessionStorage.getItem('photoChange') == undefined) return;

    let p = new AlbumPhotoClients();
    p.setFromData(JSON.parse(sessionStorage.getItem('photoChange')));

    for(let i = 0; i < this.album.photos.length; i++) {
      
      if(this.album.photos[i].id == p.id) {
        this.album.photos[i].select = p.select;
        break;
      }

    }

    sessionStorage.removeItem('photoChange');

  }

  getPhotos() {
    
    this.request = true;

    this._http.getPhotos(this.album.id).then(

      data => {

        this.album.setData(data.album);
        this.album.setPhotosData(data.photos);
        sessionStorage.setItem('album', JSON.stringify(this.album));
        sessionStorage.setItem('albumCharge', '1');

        setTimeout(() => {

          this.setBackground();

        }, 100);
        

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    );

  }

  setBackground() {
    
    for(let pho of this.album.photos) {

      let ps = document.getElementById('photo' + pho.id);
      ps.style.backgroundImage = 'url(' + pho.basicPath + ')';
      
      let width = ps.offsetWidth ;
      ps.parentElement.style.height = width + "px";

    }
  }

  likePhoto(photo) {
    // console.log(photo
    photo.select = !photo.select;
    
  }

  photoLikesCount() {

    let count = 0 ;
    
    for(let p of this.album.photos){
      if(p.select == true){ 
        count++;
      }
    }

    return count;

  }

}
