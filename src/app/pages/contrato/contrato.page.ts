import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratosService } from 'src/app/services/contratos.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  imports: [
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonSpinner,
      IonText,
      CommonModule,
    ],
})
export class ContratoPage  implements OnInit {
  contrato: Contrato | null = null;
  idContrato: string | null = null;
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
    this.idContrato = this.route.snapshot.paramMap.get('id');
    console.log('ID do contrato: ', this.idContrato);
  
    if (!this.idContrato) {
      console.log("Não tinha id");
      this.errorMessage = "Nenhum ID passado";
      this.loading = false;
      return
    }
  
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
  // async openEditModal(id: number) {
  //   // const modal = await this.modalController.create({
  //   //   component: EditarContratoComponent,
  //   //   componentProps: { contratoId: id },
  //   // });
  //   // await modal.present();
  //   // modal.onDidDismiss().then(() => this.getContratos());
  //   console.log("Criar modal de editar contrato");
    
  // }

  // deleteContrato(id: number) {
  //   this.contratosService.delete(id).subscribe(() => this.getContratos());
  // }
  editContract(id?: number) {
    console.log("Editar contrato: ", id);
    
  }

  deleteContract(id?: number) {
    console.log("Deletar contrato: ", id);
  }
}
