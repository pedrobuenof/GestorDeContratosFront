export interface Contrato {
  id?: number;
  numero_contrato: number;
  status: string;
  data_inicial: Date;
  data_final: Date;
  empresa_id: number;
  operadora_id: number;
  plano_id: number;
}