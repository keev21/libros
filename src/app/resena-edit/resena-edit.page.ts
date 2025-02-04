// resena-edit.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-resena-edit',
  templateUrl: './resena-edit.page.html',
  styleUrls: ['./resena-edit.page.scss'],
  standalone: false
})
export class ResenaEditPage implements OnInit {
  id_libro: string = "";
  id_resena: string = "";
  puntuacion: number = 0;
  resena: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService
  ) {
    this.servicio.getSession('id_libro').then((res: any) => {
      this.id_libro = res;
    });
    this.servicio.getSession('id_resena').then((res: any) => {
      if (res) {
        this.id_resena = res;
        this.cargarResena();
      }
    });
  }

  ngOnInit() {}

  cargarResena() {
    let datos = {
      "accion": "vresena",
      "id_resena": this.id_resena
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.puntuacion = res.resena.puntuacion;
        this.resena = res.resena.resena;
      }
    });
  }

  guardarResena() {
    let datos = {
      "accion": this.id_resena ? "uresena" : "nresena",
      "id_resena": this.id_resena,
      "id_libro": this.id_libro,
      "puntuacion": this.puntuacion,
      "resena": this.resena
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      this.servicio.showToast(res.mensaje);
      if (res.estado) {
        this.navCtrl.navigateBack(['resena']);
      }
    });
  }

  eliminarResena() {
    if (!this.id_resena) return;
    let datos = {
      "accion": "eresena",
      "id_resena": this.id_resena
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      this.servicio.showToast(res.mensaje);
      if (res.estado) {
        this.navCtrl.navigateBack(['resena']);
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
}
