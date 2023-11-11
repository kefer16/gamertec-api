export class ErrorPersonalizado extends Error {
   constructor(mensaje: string) {
      super(mensaje);
      // Ajusta el nombre de la clase para que sea el nombre de tu error personalizado
      this.name = this.constructor.name;
   }
}
