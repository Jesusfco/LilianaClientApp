import { Url } from './url';
export class AlbumPhotoClients {

    public id: Number;
    public album_clients_id: Number;
    public path: String;
    public select: Boolean;
    public order: Number;

    public basicPath: String;

    constructor() {
        this.select = false;
    }   

    setFromData(data) {
        this.id = parseInt(data.id);
        this.album_clients_id = parseInt(data.album_clients_id);
        this.path = data.path;

        if(data.select != null)
            this.select = data.select;
        this.order = parseInt(data.order);

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

    }
}
