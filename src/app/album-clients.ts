import { Url } from './url';

export class AlbumClients {

    public id: number;
    public client_id: number;
    public name: String;
    public img: String;
    public disponible: Number;
    public date: String;
    public created_at: String;
    public updated_at: String;

    public photoPath: String;
    public photoPath2: String;

    constructor() {

    }


    setPhotoPath() {
        let n: Url = new Url();
        this.photoPath = n.basicUrl + 'images/aplication/clients/principal_' + this.img;
        this.photoPath2 = n.basicUrl + 'images/aplication/clients/secundaria_' + this.img;
    }

    setData(data) {
        
        this.id = parseInt(data.id);
        this.client_id = parseInt(data.client_id);
        this.name = data.name;
        this.img = data.img;
        this.disponible = parseInt(data.disponible);
        this.date = data.date;

        this.setPhotoPath();

    }
}
