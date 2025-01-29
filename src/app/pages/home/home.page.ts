import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratosService } from 'src/app/services/contratos.service';
import { Contrato } from 'src/app/models/contrato.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CriarContratoComponent } from './modals/criar-contrato/criar-contrato.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    HttpClientModule,
    CommonModule,
  ],
  standalone: true
})
export class HomePage implements OnInit {
  contratos: Contrato[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private contratosService: ContratosService,
    private router: Router,
    private modalController: ModalController,
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

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CriarContratoComponent,
    });

    await modal.present();

    modal.onDidDismiss().then(() => this.getContratos());
    console.log("Criar modal de criar contrato");
    
  }
}