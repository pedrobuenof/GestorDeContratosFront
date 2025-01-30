import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratosService } from 'src/app/services/contratos.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner, IonText, IonList, IonItem, IonLabel, IonInput, IonNote, IonSelect, IonSelectOption, IonDatetime} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ContractFormComponent } from 'src/app/components/contract-form/contract-form.component';

@Component({
  selector: 'app-criar-contrato',
  templateUrl: './criar-contrato.component.html',
  styleUrls: ['./criar-contrato.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ContractFormComponent,
  ],
  standalone: true,
})
export class CriarContratoComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @Output() contractCreated: EventEmitter<void> = new EventEmitter<void>();
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private contratosService:ContratosService) { }

  ngOnInit() {}

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
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
        this.contractCreated.emit(); 
        this.closeModal();
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
