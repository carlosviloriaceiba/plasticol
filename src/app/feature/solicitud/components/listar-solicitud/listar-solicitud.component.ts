import { Component, OnInit } from '@angular/core';
import { faBan, faEye,  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Solicitud } from '@solicitud/shared/model/solicitud';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ConfigModal } from '@shared/model/config-modal';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.scss']
})
export class ListarSolicitudComponent implements OnInit {
  public solicitudes: Observable<Solicitud[]>;
  public faBan = faBan;
  public faTrashAlt = faTrashAlt;
  public faEye = faEye;
  public solicitudActual: Solicitud;
  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
     this.solicitudes = this.solicitudService.consultar();
  }

  checkEliminar(solicitud: Solicitud){
    this.solicitudActual = solicitud;
    swal.fire({
      title: 'Estas seguro de eliminar?',
      text: `Esta acción es ireversible!`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = JSON.parse( JSON.stringify(solicitud));
        data.deleted_at = moment().format('YYYY-MM-DD hh:mm:ss');
        const config: ConfigModal = { titulo:  'Borrado!',
                                      mensaje: 'Tu solicitud ha sido borrada.',
                                      tipo: 'success'
                                    };
        this.actualizar(data, config);
      }
    });
  }
  cancelar(solicitud: Solicitud){
    this.solicitudActual = solicitud;
    swal.fire({
      title: 'Estas seguro de cancelar?',
      text: `Esta acción es ireversible!`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = JSON.parse( JSON.stringify(solicitud));
        data.status = 'cancel';
        const config: ConfigModal = { titulo:  'Cancelada!',
                                      mensaje: 'Tu solicitud ha sido cancelada.',
                                      tipo: 'success'
                                    };
        this.actualizar(data, config);
      }
    });

  }

  actualizar(solicitud: Solicitud, configModal: ConfigModal){

    this.solicitudService.actualizar(solicitud).subscribe( (borrado) => {
      if (borrado){
        this.solicitudActual = solicitud;
        if (configModal){
          swal.fire(
            configModal.titulo,
            configModal.mensaje,
            configModal.tipo
          );
        }

      }

    });
  }

}
