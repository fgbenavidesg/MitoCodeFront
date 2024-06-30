export interface libroResponse {
  data: Libro[];
  success: boolean;
  errorMessage: string;
}

export interface Libro {
    id: string,
    nombre: string,
    autor: string,
    isbn: string,
    status: boolean
}
