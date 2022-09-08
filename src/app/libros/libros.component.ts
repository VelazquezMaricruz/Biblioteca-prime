import { Component, OnInit } from '@angular/core';
import { Libros } from '../interfaces/libros.interface';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  listaLibros: Libros[] = [];
  Cargando: boolean = false;

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
      }
    });
  }

}
