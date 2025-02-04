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
  libro_id: string = "";
  id_resena: string = "";
  puntuacion: number = 0;
  resena: string = "";
  mensaje: string = "";
  id_libros: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService
  ) {
    this.servicio.getSession('id_libro').then((res: any) => {
      this.id_libros = res;
      if (this.id_libros) {
       
      }
    });

    this.servicio.getSession('id_resena').then((res: any) => {
      this.id_resena = res;

      if (this.id_resena) {
        this.cargarResena();
      }
    });


    
  }


  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

  cargarResena() {
    let datos = {
      "accion": "vresena",
      "id_resena": this.id_resena
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.puntuacion = res.resena.puntuacion;
        this.resena = res.resena.resena;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  verificar() {
    if (this.id_resena) {
      this.actualizar();
    } else {
      this.insertar();
    }
  }

  insertar() {
    if (this.puntuacion === 0 || this.resena.trim() === "") {
      this.servicio.showToast("Debe llenar todos los campos");
      return;
    }

    let datos = {
      "accion": "nresena",
      "libro_id": this.id_libros,
      "puntuacion": this.puntuacion,
      "resena": this.resena
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      } else {
        this.mensaje = res.mensaje;
      }
    });
  }

  actualizar() {
    if (this.puntuacion === 0 || this.resena.trim() === "") {
      this.servicio.showToast("Debe llenar todos los campos");
      return;
    }

    let datos = {
      "accion": "uresena",
      "id_resena": this.id_resena,
      "puntuacion": this.puntuacion,
      "resena": this.resena
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      } else {
        this.mensaje = res.mensaje;
      }
    });
  }
}