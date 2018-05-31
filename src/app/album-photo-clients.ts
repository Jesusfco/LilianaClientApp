import { Url } from './url';
export class AlbumPhotoClients {

    public id: number;
    public album_clients_id: number;
    public path: String;
    public select: Boolean;
    public order: number;

    // 'https://cdn.dribbble.com/users/43718/screenshots/1137881/loadinganimation2.gif'
    public basicPath: String;
    public basicPath2: String;

    constructor() {
        this.select = false;
    }   

    setFromData(data) {
        this.id = parseFloat(data.id);
        this.album_clients_id = parseFloat(data.album_clients_id);
        this.path = data.path;

        if(data.select != null)
            this.select = data.select;
        this.order = parseFloat(data.order);

        this.setPath();
    }

    getPhotosStorage() {
        let  photos = [];

        if(localStorage.getItem('photos') == undefined) {
            return photos;
        }

        photos = JSON.parse(localStorage.getItem('photos'));

        return photos;
    }

    setPath(){

        let p: Url = new Url();
        this.basicPath = p.basicUrl + 'images/aplication/clients/app/' + this.path;
        this.basicPath2 = p.basicUrl + 'images/aplication/clients/mov/' + this.path;

    }
}
