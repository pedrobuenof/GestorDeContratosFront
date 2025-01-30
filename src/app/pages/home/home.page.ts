import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratosService } from 'src/app/services/contratos.service';
import { Contrato } from 'src/app/models/contrato.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CriarContratoComponent } from './modals/criar-contrato/criar-contrato.component';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    HttpClientModule,
    CommonModule,
    CriarContratoComponent,
    IonicModule
  ],
  standalone: true
})
export class HomePage implements OnInit {
  @ViewChild(CriarContratoComponent) modalCriarContrato!: CriarContratoComponent;
  contratos: Contrato[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private contratosService: ContratosService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log("Iniciando o componente home");
    
    this.getContratos();
  }

  getContratos() {
    console.log("buscando contratos existentes");
    this.loading = true;
    this.errorMessage = null;
    
    this.contratosService.getAll().subscribe({
      next: (data) => {
        this.contratos = data;
        console.log("Recebemos os contratos do back-end");
        console.log(this.contratos);
        if (this.contratos.length === 0) {
          this.errorMessage = 'Nenhum contrato encontrado'
        }
      },
      error: (err) => {
        this.errorMessage = 'Error ao carregar os contratos. Tente novamente mais tarde.';
        console.error("Erro ao carregar contrato", err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  navigateToContrato(id: number) {
    this.router.navigate([`/contrato/${id}`]);
  }

  openCreateModal() {
    this.modalCriarContrato.openModal();
  }

  onContractCreated() {
    // Recarregar a lista de contratos quando um novo contrato for criado
    this.getContratos();
  }
}