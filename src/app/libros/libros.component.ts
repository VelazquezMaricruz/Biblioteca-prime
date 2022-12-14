import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { TriStateCheckbox } from 'primeng/tristatecheckbox';
import { Libros } from '../interfaces/libros.interface';
import { LibrosService } from '../servicios/libros.service';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  @ViewChild('formulario') formLibro!: FormularioLibroComponent
  //Aqui se guarda la lista de libros 
  listaLibros: Libros[] = []; 
  //Esta variable nuestra la animacion de carga
  Cargando: boolean = false; 
  //Indicasi el dialogo esta visible u oculto
  dialogoVisible: boolean = false; 

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar libro';

  constructor(
    private servicioLibros: LibrosService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.CargarLibros();
  }

  CargarLibros(): void {
    this.Cargando = true;
    this.servicioLibros.get().subscribe({
      next: (datos) => {
        this.listaLibros = datos;
        this.Cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.Cargando = false;
        this.mensajes = [{severity: 'error', summary:'Error al cargar libros', detail: e.message}]
      }
    });
  }

  nuevo(){
    this.tituloDialogo = 'Registrar libro';
    this.formLibro.limpiarFormulario();
    this.formLibro.modo = 'Registar';
    this.formLibro.cargarAutores();
    this.dialogoVisible = true;
  }

  editar(libro: Libros){
    this.formLibro.codigo = libro.id;
    this.formLibro.titulo = libro.titulo;
    this.formLibro.idautor = libro.idautor;
    this.formLibro.paginas = libro.paginas;
    this.formLibro.modo = 'Editar';
    this.formLibro.cargarAutores();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar libro";
  }

  eliminar(libro: Libros){
    this.servicioConfirm.confirm({
      message: "Realmente desea eliminar el libro: '"+libro.id+"-"+libro.titulo+'-'+libro.autor+"'",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:'p-button-dange',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.servicioLibros.delete(libro).subscribe({
          next: ()=>{
           this.mensajes = [{ severity: 'success', summary:'Exito', detail: 'Se elimino correcvtamente el libro'}];
            this.CargarLibros();
          },
          error:(e) =>{
            console.log(e);
             this.mensajes = [{severity: 'error', summary:'Error al eliminar', detail: e.error}];
          }
        })
      }
    });
  }
} 
