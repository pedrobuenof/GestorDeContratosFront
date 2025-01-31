import { Component, OnInit, Input, inject, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contrato } from 'src/app/models/contrato.model';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner, IonText, IonList, IonItem, IonLabel, IonInput, IonNote, IonSelect, IonSelectOption, IonDatetime} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  standalone: true,
})
export class ContractFormComponent  implements OnInit {
  @Input() contrato?: Contrato;
  @Output() submitForm = new EventEmitter<Contrato>();
  contractForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.contractForm = this.fb.group({
      numero_contrato: [
        this.contrato?.numero_contrato || '',
        [Validators.required],
        // [this.numeroContratoValidator()]
      ],
      status: [this.contrato?.status || 'Ativo', Validators.required],
      data_inicial: [this.contrato?.data_inicial || '', Validators.required],
      data_final: [this.contrato?.data_final || '', Validators.required],
      empresa_id: [this.contrato?.empresa_id || '', Validators.required],
      operadora_id: [this.contrato?.operadora_id || '', Validators.required],
      plano_id: [this.contrato?.plano_id || '', Validators.required],
    });
  }

  // private numeroContratoValidator(): AsyncValidatorFn {
  //   return (control: FormControl): Observable<{ contratoExistente: boolean } | null> => {
  //     if (!control.value) return of(null);

  //     return control.valueChanges.pipe(
  //       debounceTime(500),
  //       switchMap((numero) =>
  //         this.contratosService.verificarNumeroContrato(numero).pipe(
  //           map((existe) => (existe ? { contratoExistente: true } : null))
  //         )
  //       )
  //     );
  //   };
  // }

  submit() {
    if (this.contractForm.invalid) return;

    const contratoFromForm: Contrato = this.contractForm.value;
    this.submitForm.emit(contratoFromForm);
  }
}
