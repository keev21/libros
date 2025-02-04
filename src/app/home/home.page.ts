import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  libros: any = [];

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService,
    private alertController: AlertController // Inyecta AlertController
  ) {
    this.mlibros();
  }

  mlibros() {
    let datos = {
      "accion": "mlibros",
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.libros = res.info;
      } else {
        //this.servicio.showToast(res.mensaje);
      }
    });
  }

  back() {
    this.navCtrl.back();
  }

  irNuevo() {
    this.servicio.closeSession('id_libro');
    this.navCtrl.navigateRoot(['libro-edit']);
  }

  irEditar(id_libro: string) {
    this.servicio.createSession('id_libro', id_libro);
    this.navCtrl.navigateRoot(['libro-edit']);
  }

  irVer(id_libro: string) {
    this.servicio.createSession('id_libro', id_libro);
    this.navCtrl.navigateRoot(['resena']);
  }

  async eliminar(id_libro: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Quieres eliminar este libro? Tambien se borrarán las reseñas',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // No hacer nada, el usuario canceló la eliminación
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Proceder con la eliminación
            let datos = {
              "accion": "elibros",
              "codigo": id_libro
            };

            this.servicio.postData(datos).subscribe((res: any) => {
              this.servicio.showToast(res.mensaje);

              if (res.estado == true) {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}