import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
private hubConnection: HubConnection | any;
  constructor() { }

   public startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7129/hubs') 
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch((err:any) => console.error('Error while starting connection: ' + err));
  }

  public addMessageListener(callback: () => void){
    this.hubConnection.on('ReceiveMessage',callback);
  }

  public sendMessage() {
    this.hubConnection.invoke('SendMessage');
  }
}
