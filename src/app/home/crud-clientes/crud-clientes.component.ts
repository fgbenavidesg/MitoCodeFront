import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionService } from '../../services/gestion.service';
import { Cliente } from '../../models/response/clienteResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ClienteRequest } from '../../models/request/clienteRequest';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-crud-clientes',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,MatCheckboxModule],
  templateUrl: './crud-clientes.component.html',
  styleUrl: './crud-clientes.component.css'
})
export class CrudClientesComponent implements OnInit{
  @ViewChild('closeButtonUpdate') closeButtonUpd?: ElementRef;
  @ViewChild('closeButtonAdd') closeButtonAdd?: ElementRef;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni', 'edad', 'status', 'accion'];
  fb=inject(FormBuilder);
  gestionSvc=inject(GestionService)
  notificationsService = inject(NotificationsService);
  clientes:Cliente[]=[];
  clientId:string="";
  //form
  clienteForm = new FormGroup({
    nombres:new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{8}$')]),
    edad: new FormControl( 0,[ Validators.required,Validators.min(10)]),
  });
  clienteUpdateForm = new FormGroup({
    nombres:new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{8}$')]),
    edad: new FormControl( 0,[ Validators.required,Validators.min(10)]),
    status: new FormControl(true)
  });
  ngOnInit() {
    this.obtenerClientes();
  }
  cerrarModalUpd() {
    const button: HTMLElement = this.closeButtonUpd?.nativeElement as HTMLElement;
    button.click();
  }
  cerrarModalAdd() {
    const button: HTMLElement = this.closeButtonAdd?.nativeElement as HTMLElement;
    button.click();
  }
  obtenerClientes(){
    this.gestionSvc.getCliente().subscribe(
      (resp)=>{
        if(resp?.success==false){
          this.notificationsService.error(
            'Error',
            resp.errorMessage
          );
        }else{
          if(resp?.data){
            this.clientes = resp?.data;
            console.log(this.clientes)
          }
        }
      }
    )
  }
  agregarCliente( ){
    if(this.clienteForm.value){
        let client : ClienteRequest ={
          nombres:this.clienteForm.value.nombres!,
          apellidos:this.clienteForm.value.apellidos!,
          dni:this.clienteForm.value.dni!,
          edad:this.clienteForm.value.edad!,
        }
        this.gestionSvc.postCliente(client).subscribe(
          (resp)=>{
            if(resp?.success==false){
              this.notificationsService.error(
                'Error',
                resp.errorMessage
              );
              this.cerrarModalAdd();
              this.clienteForm.reset();
            }else{
              this.obtenerClientes();
              this.cerrarModalAdd();
              this.clienteForm.reset();
              this.notificationsService.success(
                'Ok',
                'Cliente Agregado'
              )
            }
          }
        )
    }
  }
  cargarCliente(element: Cliente) {
    this.clientId="";
    this.clienteUpdateForm.patchValue({
      nombres: element.nombres,
      apellidos: element.apellidos,
      dni: element.dni,
      edad: element.edad,
      status:element.status
    });
    this.clientId=element.id;
  }
  updateCliente() {
    if(this.clienteUpdateForm.value){
      let client : ClienteRequest ={
        nombres:this.clienteUpdateForm.value.nombres!,
        apellidos:this.clienteUpdateForm.value.apellidos!,
        dni:this.clienteUpdateForm.value.dni!,
        edad:this.clienteUpdateForm.value.edad!,
        status:this.clienteUpdateForm.value.status!,
      }
      this.gestionSvc.updateCliente(this.clientId,client).subscribe(
        (resp)=>{
          if(resp?.success==false){
            this.notificationsService.error(
              'Error',
              resp.errorMessage
            );
            this.cerrarModalUpd();
            this.clienteUpdateForm.reset();
          }else{
            this.obtenerClientes();
            this.cerrarModalUpd();
            this.clienteUpdateForm.reset();
            this.notificationsService.success(
              'Ok',
              'Cliente Actualizado'
            )
          }
        }
      )
  }
  }
  deleteCliente( client:any){
    this.gestionSvc.deleteCliente(client.id).subscribe(
      (resp)=>{
        if(resp?.success==false){
          this.notificationsService.error(
            'Error',
            resp.errorMessage
          );
        }else{
          this.obtenerClientes();
          this.notificationsService.success(
            'Ok',
            'Cliente Dado de Baja'
          )
        }
    })
  }

}
