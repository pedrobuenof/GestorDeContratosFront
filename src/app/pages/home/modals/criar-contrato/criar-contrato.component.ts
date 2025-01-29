import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratosService } from 'src/app/services/contratos.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner, IonText, IonList, IonItem, IonLabel, IonInput, IonNote, IonSelect, IonSelectOption, IonDatetime} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-contrato',
  templateUrl: './criar-contrato.component.html',
  styleUrls: ['./criar-contrato.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonSpinner,
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CriarContratoComponent  implements OnInit {
  contrato: Contrato | null = null;
  errorMessage: string = '';
  loading: boolean = false;
  contractForm!: FormGroup;

  constructor(private modalController: ModalController, private contratosService:ContratosService) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  createContract(formData: Contrato) {
    this.loading = true;
    console.log("Dados do Contrato criado e pronto para ser salvo: ", formData);

    this.contratosService.create(formData).subscribe({
      next: (data) => {
        if (data) {
          this.contrato = data
          console.log("Contrato criado com sucesso: ", this.contrato);
        }
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
