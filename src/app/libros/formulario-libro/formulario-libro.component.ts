import { Component, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Libros } from 'src/app/interfaces/libros.interface';
import { LibrosService } from 'src/app/servicios/libros.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {

  codigo: number | null = null;
  titulo: string | null = null;
  autor: string | null = null;
  paginas: number | null = null;

  codigoValido: boolean = true;
  tituloValido: boolean = true;
  autorValido: boolean = true;
  paginasValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registar' | 'Editar' = 'Registar';

  @Output()
  recargarLibros: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioLibros: LibrosService
  ) { }

  ngOnInit(): void {
  }

  guardar() {
    if (this.validar()) {
      //Construimos el objeto libros para enviar al servidor
      const libro: Libros = {
        id: this.codigo,
        titulo: this.titulo,
        autor: this.autor,
        paginas: this.paginas
      }
      if (this.modo === 'Registar') {
        this.registrar(libro);
      } else {
        this.editar(libro);
      }
    }
  }

  private registrar(libro: Libros) {
    this.guardando = true;
    this.servicioLibros.post(libro).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se registro el libro' }];
        this.recargarLibros.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes = [{ severity: 'error', summary: 'Error al guardar', detail: e.error }];
      }
    });
  }

  private editar(libro: Libros) {
    this.guardando = true;
    this.servicioLibros.put(libro).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se edito el libro' }];
        this.recargarLibros.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes = [{ severity: 'error', summary: 'Error al editar', detail: e.error }];
      }
    });
  }



  validar() {
    this.codigoValido = this.codigo !== null
    this.tituloValido = this.titulo !== null && this.titulo?.length > 0;
    this.autorValido = this.autor !== null && this.autor?.length > 0;
    this.paginasValido = this.paginas !== null;
    return this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido
  }

  limpiarFormulario() {
    this.codigo = null;
    this.titulo = null;
    this.autor = null;
    this.paginas = null;

    this.codigoValido = true;
    this.tituloValido = true;
    this.autorValido = true;
    this.paginasValido = true;

    this.mensajes = [];
  }

}
