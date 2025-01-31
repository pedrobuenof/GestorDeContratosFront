import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratosService } from 'src/app/services/contratos.service';
import { Contrato } from 'src/app/models/contrato.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContractModalComponent } from 'src/app/components/contract-modal/contract-modal.component';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    HttpClientModule,
    CommonModule,
    ContractModalComponent,
    IonicModule
  ],
  standalone: true
})
export class HomePage implements OnInit {
  @ViewChild(ContractModalComponent) modalCriarContrato!: ContractModalComponent;
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

  saveContract(formData: Contrato) {
    this.loading = true;
    this.errorMessage = '';
    console.log("Dados do Contrato criado e pronto para ser salvo: ", formData);
    
    formData.empresa_id = Number(formData.empresa_id)
    formData.operadora_id = Number(formData.operadora_id)
    formData.plano_id = Number(formData.plano_id)

    this.contratosService.create(formData).subscribe({
      next: (data) => {
        console.log("Contrato criado com sucesso: ", data);
        this.getContratos();
      },
      error: (err) => {
        this.errorMessage = 'Error ao criar o contrato. Tente novamente mais tarde.';
        console.error("Erro ao criar o contrato", err);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}