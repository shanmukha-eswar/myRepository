import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  admin!:Admin;
  loginId!:any;
  password!:String;
  repeatedPassword!:String;

  message1!:String;
  message2!:String;
  message3!:String;
  message4!:String;
  message5!:String;
  message6!:String;
  message7!:String;
  message8!:String;
  message!:String;

  constructor(private route:ActivatedRoute ,private router:Router, private service: AdminService) {
    this.admin=new Admin();
    this.loginId=sessionStorage.getItem("AdminLoginId");
   }

  ngOnInit(): void {
    if(sessionStorage.getItem("allowAdminRegistration")!="true"){
      window.alert("Go to Login page for Registration");
      this.router.navigate(['']);
    }
  }

  async onSubmit(){
    if(this.validateData()){
      if(await this.service.registerAdmin(this.admin, this.loginId,this.password, sessionStorage.getItem("AdminLoginId"))=="success"){
        this.message="Successfully Registered. Click back button to login";
        this.admin=new Admin();
        this.loginId="";
        this.password="";
       }
     }
  }
  

  validateData():boolean{
    if(this.admin.firstName==null){
      this.message1="First Name is Required";
      return false;
    }
    else if(this.admin.firstName.length<3){
      this.message1="Minimum name length allowed is 3";
      return false;
    }
    for (let i = 0; i < this.admin.firstName.length; i++) {
      const ch = this.admin.firstName.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        this.message1="Invalid input";
        return false;
      }
    }
    this.message1="";

    //last name validations
    if(this.admin.lastName==null){
      this.message2="Last Name is Required";
      return false;
    }
    else if(this.admin.lastName.length<3){
      this.message2="Minimum name length allowed is 3";
      return false;
    }
    for (let i = 0; i < this.admin.lastName.length; i++) {
      const ch = this.admin.lastName.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        this.message2="Invalid input";
        return false;
      }
    }
      this.message2="";

    //loginId validations
    if(this.loginId==null){
      this.message6="Login Id is Required";
      return false;
    }
    else if(this.loginId.length<6){
      this.message6="Minimum length allowed is 6";
      return false;
    }
    else{
      this.message6="";
    }

    //password Validations
    
    if(this.password==null){
      this.message7="Password is Required";
      return false;
    }
    else if(this.password.length<6){
      this.message7="Minimum length allowed is 6";
      return false;
    }  
    else if(this.password!=this.repeatedPassword){
      this.message7="Password Doesn't Matched";
      return false;
    }
    let numericCount=0;
    let capCount=0;
    let smallCount=0;
    let specCount=0;
    for (let i = 0; i < this.password.length; i++) {
      const ch = this.password.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        numericCount++;
      }
      if(ch=="A" ||ch=="B" ||ch=="C" ||ch=="D" ||ch=="E" ||ch=="F" ||ch=="G" ||ch=="H" ||ch=="I" ||ch=="J" ||ch=="K" ||ch=="L" ||ch=="M" ||ch=="N" ||ch=="O" ||ch=="P" ||ch=="Q" ||ch=="R" ||ch=="S" ||ch=="T" ||ch=="U" ||ch=="V" ||ch=="W" ||ch=="X" ||ch=="Y" ||ch=="Z" ){
        capCount++;
      }
      if(ch=="a" ||ch=="b" ||ch=="c" ||ch=="d" ||ch=="e" ||ch=="f" ||ch=="g" ||ch=="h" ||ch=="i" ||ch=="j" ||ch=="k" ||ch=="l" ||ch=="m" ||ch=="n" ||ch=="o" ||ch=="p" ||ch=="q" ||ch=="r" ||ch=="s" ||ch=="t" ||ch=="u" ||ch=="v" ||ch=="w" ||ch=="x" ||ch=="y" ||ch=="z"){
        smallCount++;
      }
      if(ch=="!" ||ch=="@" ||ch=="&" ||ch=="$" ||ch=="%" ||ch=="*" ||ch=="." ||ch=="?"){
        specCount++;
      }
    }
    if(numericCount==0){
      this.message7="atleast include one digit";
      return false;
    }
    else if(capCount==0){
      this.message7="atleast include one capital letter";
      return false;
    }
    else if(smallCount==0){
      this.message7="atleast include one small letter";
      return false;
    }
    else if(specCount==0){
      this.message7="atleast include one special character (! @ & $ % * . ?)";
      return false;
    }
    this.message7="";

    //Questions Validations
    if(this.admin.question1==null || this.admin.question2==null || this.admin.question3==null){
      this.message8="Please answer all the questions they will help in recovering your credentials";
      return false;
    }
    for (let i = 0; i < this.admin.question1.length; i++) {
      const ch = this.admin.question1.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        this.message8="Invalid input while answering the questions";
        return false;
      }
    }
    for (let i = 0; i < this.admin.question2.length; i++) {
      const ch = this.admin.question2.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        this.message8="Invalid input while answering the questions";
        return false;
      }
    }
    for (let i = 0; i < this.admin.question3.length; i++) {
      const ch = this.admin.question3.charAt(i);
      if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9"){
        this.message8="Invalid input while answering the questions";
        return false;
      }
    }
    this.message8="";

    return true;
  }

}
