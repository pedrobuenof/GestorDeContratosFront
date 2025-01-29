export interface Contrato {
  id?: number;
  numero_contrato: number;
  status: string;
  data_inicial: string;
  data_final: string;
  empresa_id: number;
  operadora_id: number;
  plano_id: number;
}