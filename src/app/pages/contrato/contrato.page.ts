import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratosService } from 'src/app/services/contratos.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { ContractModalComponent } from 'src/app/components/contract-modal/contract-modal.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  imports: [
      IonicModule,
      CommonModule,
      ContractModalComponent,
    ],
})
export class ContratoPage  implements OnInit {
  @ViewChild(ContractModalComponent) modalEditarContrato!: ContractModalComponent;

  contrato!: Contrato;
  idContrato!: number;

  errorMessage: string = '';
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private contratoService: ContratosService) { }

  ngOnInit() {
    console.log("Contrato page inicializado");
    console.log(this.contrato);
    
    this.getContratById()
    console.log("Contrato pego");
    console.log(this.contrato);
  }
  
  getContratById() {
    this.loading=true;
    this.idContrato = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID do contrato: ', this.idContrato);
  
    this.contratoService.getById(this.idContrato).subscribe({
      next: (data) => {
        this.contrato = Array.isArray(data) ? data[0] : data;
        console.log("Recebemos o contrato certinho");
        console.log(this.contrato);
        console.log(this.contrato?.empresa_id);
        
        if (!this.contrato?.id) {
          this.errorMessage = 'Nenhum contrato encontrato com o ID passado'
        }
      },
      error: (err) => {
        this.errorMessage = 'Error ao carregar os contratos. Tente novamente mais tarde.';
        console.error("Erro ao carregar contrato", err);
      },
      complete: () => {
        this.loading = false
      },
    })
  }

  openEditModal(contrato: Contrato) {
    this.modalEditarContrato.contrato = contrato;
    this.modalEditarContrato.openModal();
  }

  // deleteContrato(id: number) {
  //   this.contratosService.delete(id).subscribe(() => this.getContratos());
  // }

  saveEdit(formData: Contrato) {
    if (!this.idContrato) {
      console.log("Deu Error em salvar a edição por algum motivo com o ID");
      return
    }

    this.contratoService.update(this.idContrato, formData).subscribe(() => {
      this.getContratById()
    })
  }

  deleteContract(id?: number) {
    console.log("Deletar contrato: ", id);
  }
}
