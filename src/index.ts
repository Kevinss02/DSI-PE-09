import {readFileSync} from 'fs';

abstract class BaseProcesadorMochila {
  public textLines: string[] = [];
  // Template Method
  public procesar(fichero: string): [string[], string[]] {
    this.hook1();
    this._readFile(fichero);
    this.hook2();
    const arr = this.processByFormat();
    return arr;
  }

  // Base Operation
  protected _readFile(fichero: string) { 
    this.textLines = (readFileSync(fichero).toString().split("\n"));
  }
  
  // Abstract to subclases
  protected abstract processByFormat(): [string[], string[]];

  // Hooks
  protected hook1(): void { }
  protected hook2(): void { }
}

class ProcesadorMochilaCSV extends BaseProcesadorMochila {
  protected processByFormat(): [string[], string[]] {
    let capacity = this.textLines[0];
    let numberOfElements: number = parseInt(this.textLines[1]);
    let str1: string = "";
    let str2: string = "";
    let mid: boolean = false;
    let pesos: string[] = [];
    let beneficios: string[] = [];
    for (let i = 0; i < numberOfElements; i++) {
      for (let j = 0; j < this.textLines[2 + i].length; j++) {
        if (this.textLines[2 + i][j] === ' ') { mid = true; }
        if (!mid) { str1 += this.textLines[2 + i][j]; }
        else { str2 += this.textLines[2 + i][j]; }
      }
      pesos.push(str1);
      beneficios.push(str2);
      str1 = "";
      str2 = "";
      mid = false;
    }
    return [pesos, beneficios];
  }
}

class ProcesadorMochilaJSON extends BaseProcesadorMochila {
  // ToDO
  protected processByFormat(): [string[], string[]] { return [[],[]]; }
}

function clientCode(procesadorMochila: BaseProcesadorMochila) {
  const arr = procesadorMochila.procesar("input.txt");
  console.log(arr);
}

clientCode(new ProcesadorMochilaCSV());