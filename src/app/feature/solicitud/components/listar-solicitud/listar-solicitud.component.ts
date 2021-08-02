import { Component, OnInit } from '@angular/core';
import { faEye, faPencilAlt,  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Solicitud } from '@solicitud/shared/model/solicitud';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.scss']
})
export class ListarSolicitudComponent implements OnInit {
  public solicitudes: Observable<Solicitud[]>;
  public faPencilAlt = faPencilAlt;
  public faTrashAlt = faTrashAlt;
  public faEye = faEye;
  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
     this.solicitudes = this.solicitudService.consultar();
  }

  checkEliminar(solicitud: Solicitud){

    swal.fire({
      title: 'Estas seguro de eliminar?',
      text: `Esta acción es ireversible!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.eliminar(solicitud);
      }
    });
  }

  eliminar(solicitud: Solicitud){
    const data = JSON.parse( JSON.stringify(solicitud));
    data.deleted_at = moment().format('YYYY-MM-DD hh:mm:ss');
    this.solicitudService.actualizar(solicitud).subscribe( (borrado) => {
      if (borrado){
        solicitud.deleted_at = data.deleted_at;
        swal.fire(
          'Borrado!',
          'Tu solicitud a sido borrada.',
          'success'
        );
      }

    });
  }

}
