import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { GestionService } from '../../services/gestion.service';
import { Libro } from '../../models/response/libroResponse';
import { LibroRequest } from '../../models/request/libroRequest';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-crud-libros',
  standalone: true,
  imports: [ MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,MatCheckboxModule],
  templateUrl: './crud-libros.component.html',
  styleUrl: './crud-libros.component.css'
})
export class CrudLibrosComponent implements OnInit {
  @ViewChild('closeButtonUpdate') closeButtonUpd?: ElementRef;
  @ViewChild('closeButtonAdd') closeButtonAdd?: ElementRef;
  displayedColumns: string[] = ['id', 'nombre', 'autor', 'isbn','status','accion'];
  fb=inject(FormBuilder);
  gestionSvc=inject(GestionService)
  notificationsService = inject(NotificationsService);
  libros:Libro[]=[];
  libroId:string="";

  //form
  libroForm = new FormGroup({
    nombre:new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{13}$')]),
  });
  libroUpdateForm = new FormGroup({
    nombre:new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{13}$')]),
    status: new FormControl(true)
  });
  ngOnInit() {
    this.obtenerLibros();
  }
  cerrarModalUpd() {
    const button: HTMLElement = this.closeButtonUpd?.nativeElement as HTMLElement;
    button.click();
  }
  cerrarModalAdd() {
    const button: HTMLElement = this.closeButtonAdd?.nativeElement as HTMLElement;
    button.click();
  }
  obtenerLibros(){
    this.gestionSvc.getLibros().subscribe(
      (resp)=>{
        if(resp?.success==false){
          this.notificationsService.error(
            'Error',
            resp.errorMessage
          );
        }else{
          if(resp?.data){
            this.libros = resp?.data;
            console.log(this.libros)
          }
        }
      }
    )
  }
  agregarLibro( ){
    if(this.libroForm.value){
        let libro : LibroRequest ={
          nombre:this.libroForm.value.nombre!,
          autor:this.libroForm.value.autor!,
          isbn:this.libroForm.value.isbn!,
        }
        this.gestionSvc.postLibros(libro).subscribe(
          (resp)=>{
            if(resp?.success==false){
              this.notificationsService.error(
                'Error',
                resp.errorMessage
              );
              this.cerrarModalAdd();
              this.libroForm.reset();
            }else{
              this.obtenerLibros();
              this.cerrarModalAdd();
              this.libroForm.reset();
              this.notificationsService.success(
                'Ok',
                'Libro Agregado'
              )
            }
          }
        )
    }
  }
  cargarLibro(element: Libro) {
    this.libroId="";
    this.libroUpdateForm.patchValue({
      nombre:element.nombre!,
      autor:element.autor!,
      isbn:element.isbn!,
      status:element.status
    });
    this.libroId=element.id;
  }
  updateLibro() {
    if(this.libroUpdateForm.value){
      let libro : LibroRequest ={
        nombre:this.libroUpdateForm.value.nombre!,
        autor:this.libroUpdateForm.value.autor!,
        isbn:this.libroUpdateForm.value.isbn!,
        status:this.libroUpdateForm.value.status!
      }
      this.gestionSvc.updateLibros(this.libroId,libro).subscribe(
        (resp)=>{
          if(resp?.success==false){
            this.notificationsService.error(
              'Error',
              resp.errorMessage
            );
            this.cerrarModalUpd();
            this.libroUpdateForm.reset();
          }else{
            this.obtenerLibros();
            this.cerrarModalUpd();
            this.libroUpdateForm.reset();
            this.notificationsService.success(
              'Ok',
              'Libro Actualizado'
            )
          }
        }
      )
    }
  }
  deleteLibro( element :Libro){
    this.gestionSvc.deleteLibros(element.id).subscribe(
      (resp)=>{
        if(resp?.success==false){
          this.notificationsService.error(
            'Error',
            resp.errorMessage
          );
        }else{
          this.obtenerLibros();
          this.notificationsService.success(
            'Ok',
            'Libro Dado de Baja'
          )
        }
    })
  }
}
