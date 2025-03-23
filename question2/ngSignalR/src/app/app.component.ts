import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor() {
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();


    // On peut commencer à écouter pour les évènements qui vont déclencher des callbacks
    this.hubConnection!.on('updateNbUsers', (data) => {
      // data a le même type que ce qui a été envoyé par le serveur
      this.nbUsers = data
    });

    this.hubConnection!.on('UpdateMoney', (data) => {
      this.money = data
    });

    this.hubConnection!.on('UpdateNbPizzasAndMoney', (dataNbPizzas: number, dataMoney: number) => {
      this.nbPizzas = dataNbPizzas
      this.money = dataMoney
    });

    this.hubConnection!.on('UpdatePizzaPrice', (data) => {
      this.pizzaPrice = data
    });

    // On se connecte au Hub  
    this.hubConnection
      .start()
      .then(() => {
        console.log('La connexion est active!');
        // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
        this.isConnected = true;
      })
      .catch(err => console.log('Error while starting connection: ' + err));

  }

  selectChoice(selectedChoice: number) {
    this.hubConnection!.invoke('SelectChoice', selectedChoice);
    this.selectedChoice = selectedChoice;
  }

  unselectChoice() {
    this.hubConnection!.invoke('UnselectChoice', this.selectedChoice);
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }

}
