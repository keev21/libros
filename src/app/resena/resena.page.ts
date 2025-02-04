// resena.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.page.html',
  styleUrls: ['./resena.page.scss'],
  standalone: false

})
export class ResenaPage implements OnInit {
  id_libro: string = "";
  libro: any = {};
  resenas: any[] = [];

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService
  ) {
    this.servicio.getSession('id_libro').then((res: any) => {
      this.id_libro = res;
      if (this.id_libro) {
        this.cargarLibro();
        this.cargarResenas();
      }
    });
  }

  ngOnInit() {}

  cargarLibro() {
    let datos = {
      "accion": "llibros",
      "id_libro": this.id_libro
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.libro = res.libro[0];
      }
    });
  }

  cargarResenas() {
    let datos = {
      "accion": "mresenas",
      "id_libro": this.id_libro
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.resenas = res.resenas;
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
  nuevaResena(){
    
  }
}
