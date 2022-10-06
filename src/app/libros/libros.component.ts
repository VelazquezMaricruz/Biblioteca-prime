import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
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
    private servicioLibros: LibrosService

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
    this.dialogoVisible = true;
  }

  editar(libro: Libros){
    this.formLibro.codigo = libro.id;
    this.formLibro.titulo = libro.titulo;
    this.formLibro.autor = libro.autor;
    this.formLibro.paginas = libro.paginas;
    this.formLibro.modo = 'Editar';
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar libro";
   }
}
