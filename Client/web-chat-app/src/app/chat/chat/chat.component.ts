import { Component, OnInit } from '@angular/core';
import { MessageDto } from 'src/app/Dto/MessageDto';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto)=>
      {this.addToInbox(receivedObj)});
  }
  msgDto: MessageDto=new MessageDto();
  msgInboxArray: MessageDto[]=[];

  send():void{
    if(this.msgDto){
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("Both fields are reuired");
        return;
      }
      else {
        this.chatService.broadcastMessage(this.msgDto);        
      }
  }
}
  addToInbox(obj:MessageDto){
    let newObj=new MessageDto();
    newObj.user=obj.user;
    newObj.msgText=obj.msgText;
    newObj.date=new Date();
    this.msgInboxArray.push(newObj);    
  }
}
