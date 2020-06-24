import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public num1: number;
  public num2: number;
  public resul: number;

  constructor() {}

  public soma(){
    this.resul = this.num1 + this.num2;
  }

  public sub(){
    this.resul = this.num1 - this.num2;
  }

  public mult(){
    this.resul = this.num1 * this.num2;
  }

  public divi(){
    this.resul = this.num1 / this.num2;
  }

  public limpar(){
    this.resul = null;
    this.num1 = null;
    this.num2 = null;
  }
}
