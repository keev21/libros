import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-libro-edit',
  templateUrl: './libro-edit.page.html',
  styleUrls: ['./libro-edit.page.scss'],
  standalone: false
})
export class LibroEditPage implements OnInit {
  id_libro: string = "";
  txt_titulo: string = "";
  txt_descripcion: string = "";
  mensaje: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService,
  ) { 
    this.servicio.getSession('id_libro').then((res: any) => {
      this.id_libro = res;

      if (this.id_libro) {
        this.loadLibro();
      }
    });
  }

  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

  // Cargar los datos del libro
  loadLibro() {
    let datos = {
      "accion": "llibro",
      "id_libro": this.id_libro
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        let libro = res.libro[0];
        this.txt_titulo = libro.titulo;
        this.txt_descripcion = libro.descripcion;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  // Verificar si se debe insertar o actualizar
  verificar() {
    if (this.id_libro) {
      this.actualizar();
    } else {
      this.insertar();
    }
  }

  insertar() {
    if (this.txt_titulo.trim() === "" || this.txt_descripcion.trim() === "") {
      this.servicio.showToast("Debe llenar todos los campos");
      return;
    }

    let datos = {
      "accion": "ilibro",
      "titulo": this.txt_titulo,
      "descripcion": this.txt_descripcion
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
    if (this.txt_titulo.trim() === "" || this.txt_descripcion.trim() === "") {
      this.servicio.showToast("Debe llenar todos los campos");
      return;
    }

    let datos = {
      "accion": "ulibro",
      "id_libro": this.id_libro,
      "titulo": this.txt_titulo,
      "descripcion": this.txt_descripcion
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
