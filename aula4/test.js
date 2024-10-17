class Copo {
    constructor(volume, material, cor, peso, formato) {
      this.volume = volume;
      this.material = material;
      this.cor = cor;
      this.peso = peso;
      this.formato = formato;
    }
  }
  
  const copo1 = new Copo(208, "vidro", "transparente", 100, "cilindrico");
  const copo2 = new Copo(500, "plastico", "vermelho", 50, "conico");
  
  console.log(copo1.material);
  console.log(copo2.material);
  