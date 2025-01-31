import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { Contrato } from 'src/app/models/contrato.model';
import { ContratosService } from 'src/app/services/contratos.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner, IonText, IonList, IonItem, IonLabel, IonInput, IonNote, IonSelect, IonSelectOption, IonDatetime} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ContractFormComponent } from 'src/app/components/contract-form/contract-form.component';

@Component({
  selector: 'app-contract-modal',
  templateUrl: './contract-modal.component.html',
  styleUrls: ['./contract-modal.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ContractFormComponent,
  ],
  standalone: true,
})
export class ContractModalComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  @Input() contrato?: Contrato;
  @Output() submitForm: EventEmitter<Contrato> = new EventEmitter<Contrato>();

  constructor(private contratosService:ContratosService) { }

  ngOnInit() {}

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

  onSubmit(formData: Contrato) {
    this.submitForm.emit(formData);
    this.closeModal();
  }
}
