import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Storage } from '../storage';
import { Router } from '@angular/router';
// import { animations } from '../animations';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css'],  
  animations: [
    trigger('menu', [
      state('initial', style({
        transform: 'translate3d(0,0,0)',
        visibility: 'visible'
      })),

      state('final' ,style({
        transform: 'translate3d(-100%,0,0)',
        visibility: 'hidden'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
    
    trigger('space', [
      state('initial', style({
        padding: '60px 0px 0px 250px'
      })),

      state('final' ,style({
        padding: '60px 0px 0px 0px'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
  ]
})
export class NavegationComponent implements OnInit {

    @Output() closeSession= new EventEmitter();

    stateMenu: string;
    statePanel: string;

    userData: Storage = new Storage();

    view: any = {
      inventario: true,
      caja: false,
      puntoVenta: false,
    }

    constructor( private router: Router) { }            

    sideNav(){
        if(window.screen.width < 750){
          this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
          // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
  
        } else {
          this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
          this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
        }
  
        
      }
  
    ngOnInit() {
      if(window.screen.width < 750){
        this.stateMenu = "final";
        this.statePanel = 'final';
      } else {
        this.stateMenu = "initial";
        this.statePanel = 'initial';
      }

    }

    cerrarSesion(){
        localStorage.clear();
        location.reload();
        // this.cerrarSesion.emit();
    }

    closeNavMov(){
        if(window.screen.width < 750){
            this.stateMenu = "final";
            // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');

        } 
    }

    redirect(url) {
      this.closeNavMov();
      this.router.navigate([url]);
    }

    
}
