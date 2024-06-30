import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { GestionService } from '../../services/gestion.service';
import { Pedido } from '../../models/response/pedidoResponse';
import { PedidoRequest } from '../../models/request/pedidoRequest';
import { NotificationsService } from 'angular2-notifications';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-gestionar-pedidos',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,MatCheckboxModule],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrl: './gestionar-pedidos.component.css'
})
export class GestionarPedidosComponent {
  @ViewChild('closeButtonAdd') closeButtonAdd?: ElementRef;
  displayedColumns: string[] = ['id', 'cliente', 'libro', 'fecha','status'];
  fb=inject(FormBuilder);
  gestionSvc=inject(GestionService)
  notificationsService = inject(NotificationsService);
  pedidos:Pedido[]=[];
  clientDniControl: FormControl=new FormControl('',[Validators.required,Validators.pattern('^[0-9]{8}$')]);

  pedidoForm = new FormGroup({
    clienteId:new FormControl('', [Validators.required]),
    librosId: new FormControl('', [Validators.required]),
  });
  cerrarModalAdd() {
    const button: HTMLElement = this.closeButtonAdd?.nativeElement as HTMLElement;
    button.click();
  }
  obtenerPedidos(){
    this.gestionSvc.getPedidos(this.clientDniControl.value).subscribe(
      (resp)=>{

        if(resp?.success==false){
          this.notificationsService.error(
            'Error',
            resp.errorMessage
          );
        }else{
          if(resp?.data){
            this.pedidos = resp?.data;
            this.clientDniControl.setValue('');
            console.log(this.pedidos);
          }
        }
      }
    )
  }
  agregarPedido( ){
    if(this.pedidoForm.value){
        let pedido : PedidoRequest ={
          clienteId:this.pedidoForm.value.clienteId!,
          librosId:this.pedidoForm.value.librosId!,
        }
        this.gestionSvc.postPedido(pedido).subscribe(
          (resp)=>{
            console.log(resp)
            if(resp?.success==false){
              this.notificationsService.error(
                'Error',
                resp.errorMessage
              );
              this.pedidoForm.reset();
              this.cerrarModalAdd();
            }else{
              this.pedidos=[];
              this.cerrarModalAdd();
              this.pedidoForm.reset();
              this.notificationsService.success(
                'Ok',
                'Pedido Agregado'
              )
            }
          }
        )
    }
  }
}
