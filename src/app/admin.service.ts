import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Session } from './session';
import { SkillSet } from './skill-set';
import { Trainer } from './trainer';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  async getAdminDetails(adminId:String){
    return await this.http.get<String[]>("http://localhost:8080/admin/getAdminDetails/"+adminId).toPromise();
  }

  async registerAdmin(admin:Admin, loginId:String, password:String, defaultId:any){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/adminRegistration/" + admin.firstName + "/" + admin.lastName + "/" + admin.age +"/"+ admin.gender +"/"+admin.contactNumber+ "/" + loginId + "/" + password + "/" + admin.question1 + "/" + admin.question2 + "/" + admin.question3+"/"+defaultId).toPromise();
    return response[0];
  }

  async getSkillsets(){
    let response=await this.http.get("http://localhost:8080/admin/skillsets").toPromise();
    return response;
  }

  async getSessionsBySkillType(skillType:String){
    return await this.http.get("http://localhost:8080/admin/getSessionsBySkillType/"+skillType).toPromise();
 }

  async getTrainers(){
    let response=await this.http.get("http://localhost:8080/admin/trainers").toPromise();
    return response;
  }

  async getSessions(id:number){
    let response=await this.http.get("http://localhost:8080/admin/sessions/"+id).toPromise();
    return response;
  }

  async getAvailableTrainers(date:String, slot:String, skill:String){
    let response=await this.http.get("http://localhost:8080/admin/availableTrainers/"+date+"/"+slot+"/"+skill).toPromise();
    return response;
  }

  async addSession(session:Session, adminId:number){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/addSession/"+session.sessionDescription+"/"+session.sessionDate+"/"+session.slot+"/"+session.skillType+"/"+session.trainer.trainerName+"/"+adminId+"/"+session.trainer.trainerId+"/"+0).toPromise();
    return response;
  }

  async addTrainer(trainer:Trainer){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/addTrainer/"+trainer.trainerName+"/"+trainer.contactNumber+"/"+trainer.email+"/"+trainer.skillType+"/"+0).toPromise();
    return response;
  }

  async addSkillSet(skill:SkillSet){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/addSkillSet/"+skill.skillType+"/"+skill.skillDescription).toPromise();
    return response;
  }

  async updateSession(session:Session){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/addSession/"+session.sessionDescription+"/"+session.sessionDate+"/"+session.slot+"/"+session.skillType+"/"+session.trainer.trainerName+"/"+0+"/"+0+"/"+session.sessionId).toPromise();
    return response;
  }

  async updateTrainer(trainer:Trainer){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/addTrainer/"+trainer.trainerName+"/"+trainer.contactNumber+"/"+trainer.email+"/"+trainer.skillType+"/"+trainer.trainerId).toPromise();
    return response;
  }

  async delete(name:String, id:number){
    let response=await this.http.get<String[]>("http://localhost:8080/admin/delete/"+name+"/"+id).toPromise();
    return response;
  }

  async getEnrolledUsers(sessionId:number){
    let response=await this.http.get("http://localhost:8080/admin/getEnrolledUsers/"+sessionId).toPromise();
    return response;
  }

  async getAttendedUsers(sessionId:number){
    let response=await this.http.get("http://localhost:8080/admin/getAttendedUsers/"+sessionId).toPromise();
    return response;
  }
}
