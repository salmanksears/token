import {Component, OnInit} from '@angular/core';

@Component({
    template: `
        <div class="home-message">
        <h3>Welcome to the MicroServices Maintenance Panel !</h3>
        <h4>{{adminMessage}}</h4>
       </div> 
        `,
        styles:[`
        .home-message {
            padding: 0px 20px 20px 220px;
        }
        `]
})
export class HomeComponent  {
    role = "USER";
    adminMessage = "";
   
}