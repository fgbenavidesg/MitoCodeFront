export interface PedidoResponse {
  data: Pedido[];
  success: boolean;
  errorMessage: string;
}

export interface Pedido {
    id: string,
    cliente: string,
    libro: string,
    fecha: string,
    hora: string,
    status: boolean
}
