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
  public photos: Array<AlbumPhotoClients> = [];
  public album: AlbumClients = new AlbumClients();
  public request: Boolean = false;

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) { 

      this.observerRef = actRou.params.subscribe(params => {

        this.album.id = params['id'];
        this.getPhotos();
        
      });

    }

  ngOnInit() {
  }

  getPhotos() {
    
    this.request = true;

    this._http.getPhotos(this.album.id).then(

      data => {
        
        for(let d of data){
          let photo: AlbumPhotoClients = new AlbumPhotoClients();

          photo.setFromData(d);

          this.photos.push(photo);
        }

        setTimeout(() => {

          this.setBackground();

        }, 100);
        

      },

      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    );

  }

  setBackground() {
    
    for(let pho of this.photos) {

      let ps = document.getElementById('photo' + pho.id);
      ps.style.backgroundImage = 'url(' + pho.basicPath + ')';
      let width = ps.offsetWidth ;
      console.log('width:' + width);

      ps.parentElement.style.height = width + "px";

    }
  }

  likePhoto(photo) {
    // console.log(photo
    photo.select = !photo.select;
    
  }
}
