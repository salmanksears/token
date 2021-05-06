import {Component,ViewChild,OnInit}         from '@angular/core';
import {ComponentsService}                  from './components.service';
import {RouterLink, Router, ActivatedRoute} from '@angular/router';
import {SpinnerComponent}                   from '../shared/components/spinner.component';
import {ResponseMessageComponent}           from '../shared/components/response-message.component';
import {ComponentFilter}                    from '../shared/filters/component-filter';

@Component({
    templateUrl: 'app/components/components.component.html'
})

export class ComponentsComponent implements OnInit{

   displayMsg = false;
   components = [];
   pageLoading = true;
   anyComponent = false;
   isEditable = false;
   componentMessage : String;
   messageType : string;
   message : string;
   selectComponentId : String;
   rowsOnPage : Number;
   
   constructor(private _componentsService: ComponentsService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute){
    }

   ngOnInit(){

		this._activatedRoute.params.subscribe(params => {
            this.componentMessage = params['compId'];
        });
       
        this.display(this.componentMessage);
        this.rowsOnPage = 10;
		this._componentsService.getComponents()
       .subscribe(
            data => {
              this.components = data.comps;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                this.pageLoading = false;
            },
            ()=>{
                console.log('Service call finished.');
                console.log(this.components);
                if(this.components.length > 0){
                   this.pageLoading = false;
                   this.anyComponent = true;
                }
            }
        );
	} 

    updateComponent(component : any){
        this._router.navigate(['components', 'show' , component.compId]);
        console.log(component);
    }

    addNewComponent(){
        this._router.navigate(['components', 'new']);
    }

    over(component : any){
        this.selectComponentId = component.compId;
    }

    tableMouseOut(){
        this.selectComponentId = null;
    }

    display(componentMessage){
        if(componentMessage != null && componentMessage.length > 0){
            this.displayMsg = true;
            var processType;
            this._activatedRoute.params.subscribe(params => {
                processType = params['operation'];
            });
            this.messageType = "SUCCESS";
            this.message = "Component " + this.componentMessage + " is " + processType + " successfully" ;
        }
    }
}
    