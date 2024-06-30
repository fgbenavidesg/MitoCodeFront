export interface clienteResponse {
  data: Cliente[];
  success: boolean;
  errorMessage: string;
}

export interface Cliente {
    id: string,
    nombres: string,
    apellidos: string,
    dni: string,
    edad: number,
    status: boolean
}
