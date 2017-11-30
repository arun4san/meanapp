import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-login',
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	usereDetails: any;
  user: any = {'email':'', 'password':''};
  uerLog: any;

  constructor(private apiService:ApiService, private router: Router) {

  this.apiService.getFilteredObject('/api/getFilteredObject',{"query": {},"collection":"users"}).subscribe(usereDetails => {
      this.usereDetails = usereDetails;
    }); 
}

  ngOnInit() {
  }

   login(){
    var authenticatedUser = this.usereDetails.find(u => (u.username === this.user.email && u.password == this.user.password));
    if(authenticatedUser){
    	this.router.navigate(['dashboard']);
    }else{
    	console.log("No User");
      
    }
}

}
