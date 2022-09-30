import { Component, OnInit } from '@angular/core';
import { TriStateCheckbox } from 'primeng/tristatecheckbox';
import { Libros } from '../interfaces/libros.interface';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

//Aqui se guarda la lista de libros 
  listaLibros: Libros[] = []; 
  //Esta variable nuestra la animacion de carga
  Cargando: boolean = false; 
  //Indicasi el dialogo esta visible u oculto
  dialogoVisible: boolean = false; 

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

  mostrarDialogo(){
    this.dialogoVisible = true;
  }
}
