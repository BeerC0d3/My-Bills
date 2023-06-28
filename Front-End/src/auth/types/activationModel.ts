export interface CheckActivationModel {
  isValid: boolean;
  mensaje: string;
  usuario: string;
}

export interface ActivationModel {
  Username: string | undefined;
  Password: string;
  CodigoActivacion: string | undefined;
}

export interface ProfileImageModel {
  userId: number;
  urlImagen?: string | undefined;
  imagenBase64?: string | undefined;
  nombreImagen?: string | undefined;
}
