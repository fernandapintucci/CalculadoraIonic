import { Component } from '@angular/core';
import { evaluate } from 'mathjs'; // Nova biblioteca
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  public calculo = ''; // Vartiável vazia
  public resultado: string; // Variável nula

  private ponto = false; // Não há ponto na tela, portanto começa falsa

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {} // Importação para Alert

  // Método para adicionar um valor na calculadora - como texto 
  public adicionarNumero(valor: string) {
    if(this.resultado) { // Variável informada para conseguir apagar tudo
      this.apagarTudo(); // Limpa para fazer outras operações
    }
    this.calculo = this.calculo + valor;
  }

  // Método para adicionar o "." (ponto) na calculadora
  public adicionarPonto() {
    if (this.ponto) { // Condição para executar o ponto somente uma vez
      return; // Evita vários pontos seguidos
    }
    this.calculo += ".";
    this.ponto = true; // Agora verdadeira pois o ponto ainda nao foi executado
  }

  // Método para adicionar operações
  public adicionarOperacao(operador: string) {
    if(this.resultado){ // Campo resultado preenchido
      this.calculo = this.resultado.toString(); // Resultado convertido em texto
      this.resultado = null; // Limpa resultado
    }

    const ultimo = this.calculo.slice(-1); // Pega o ultimo caracter para não repetir
    if(this.operacoes.indexOf(ultimo)> -1) { // indexOf: Procura o que vem por parametro (uma das operações)
      return;  // Evita vários sinais de operadores seguidos
    }
    this.calculo += operador;
    this.ponto = false; // Executa o ponto depois  de alguma operação informada
  }

  // Método para deletar(zerar) todos os números do cálculo
  public apagarTudo() {
    this.calculo = ''; // variável vazia
    this.resultado = null; // Variável nula (limpa o que tem nela)
    this.ponto = false; // Inclui o ponto depois que limpa a calculadora
  }

  // Método para apagar o último caracter informado
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1); // Slice: (inicio: inicia o "corte" do texto, final: fim do "corte" - não inclui)
    if(ultimo == '.') { // Condição para verificar se o último caracter é um ponto
      this.ponto = false;
    }
    
    this.calculo = this.calculo.slice(0, -1); 
  }

  //Método para calcular os resultados
  public calcularResultado() {
    try{
      this.resultado = evaluate(this.calculo); // Executar na linha de cálculo
    } catch(e) {
     this.resultado = '';
     this.presentAlert('ERRO!','Cálculo inválido, verifique!'); // Título / Mensagem caso dê erro
   }
}

// Método de mensagem de alerta
  async presentAlert(titulo: string, message: string) { 
    const alert = await this.alertController.create({
      header: titulo, // Título da mensagem
      message: message, // Mensagem que será recebida por parametro dentro do Alert
      buttons: ['OK']
    });

    await alert.present();
  }
}

