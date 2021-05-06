import {Component}                           from '@angular/core';
import {UserService}                         from './user.service';
import {RouterLink, Router, ActivatedRoute } from '@angular/router';
import {SpinnerComponent}                    from '../shared/components/spinner.component';
import {ResponseMessageComponent}            from '../shared/components/response-message.component';
import {UserFilter}                          from '../shared/filters/user-filter';

@Component({
    templateUrl: 'app/users/user.component.html'
})

export class UserComponent{
     
   users = [];
   pageLoading = true;
   anyUser = false;
   isEditable = false;
   displayMsg = false;
   userMessage : String;
   messageType : String;
   message : String;
   selectUserId : String;
   rowsOnPage : Number;
   
   constructor(private _userService: UserService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute){
    }

   ngOnInit(){
        this._activatedRoute.params.subscribe(params => {
            this.userMessage = params['userName'];
        });
        this.display(this.userMessage);
	    this.rowsOnPage = 10;
		this._userService.getUsers().subscribe(
            data => {
              this.users = data.users;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                this.pageLoading = false;
            },
            ()=>{
                console.log('Service call finished.');
                console.log(this.users);
                if(this.users.length > 0){
                   this.pageLoading = false;
                   this.anyUser = true;
                }
            }
        );
	} 

    updateUser(user : any){
       this._router.navigate(['users', 'show', user.userId]);
    }

    addNewUser(){
        this._router.navigate(['users', 'new']);
    }

    over(user : any){
        this.selectUserId = user.userId;
    }

    tableMouseOut(){
        this.selectUserId = null;
    }

    display(userMessage){
        if(userMessage != null && userMessage.length > 0){
            var processType;
            this._activatedRoute.params.subscribe(params => {
              processType = params['operation'];
            });
            this.displayMsg = true;
            this.messageType = "SUCCESS";
            this.message = "User " + this.userMessage + " is " + processType + " successfully" ;
        }
    }
}
    