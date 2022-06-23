
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {MessageDto } from 'src/app/Dto/MessageDto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-chat-app';
  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent
                                                     
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  chatuser=this.msgDto.user;

  setUsername()
  {
 this.chatuser = this.msgDto.user;
if(this.chatuser===null)
{
alert("please enter the User name");
}

  }

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto).subscribe(data => {
          this.msgDto.msgText = '';
        }); 
                          // Send the message via a service
}
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);
  //  this.msgDto.user=" ";
  // this.msgDto.msgText=" ";
  }
}
