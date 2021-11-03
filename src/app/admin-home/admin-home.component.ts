import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { Session } from '../session';
import { SkillSet } from '../skill-set';
import { Trainer } from '../trainer';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  id: any;
  admin!: Admin;
  skills!: any;
  skill!: SkillSet;
  trainers!: any;
  trainer!: Trainer;
  sessions!: any;
  session!: Session;
  availableTrainers!: any;
  skillType!: String;
  enrolledUsers!: any;
  attendedUsers!: any;

  message1!: String;
  message2!: String;
  message3!: String;
  message4!: String;
  message5!: String;
  todaysDate!: String;

  view: boolean[] = [true, false, false, false, false];

  constructor(private route: ActivatedRoute, private router: Router, private service: AdminService) {
    this.id = sessionStorage.getItem("id");
    this.admin=new Admin();
  }


  ngOnInit(): void {
    if (sessionStorage.getItem("isLoggedin") != "true") {
      window.alert("Please login...");
      this.router.navigate(['']);
    }
    this.getAdminDetails();
    this.formatDate();
    this.getSkillsets();
    this.getTrainers();
    this.getSessions();

  }

  formatDate() {
    let d = new Date();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    this.todaysDate = [year, month, day].join('-');
  }

  async getAdminDetails() {
    let response = await this.service.getAdminDetails(this.id);
    response.forEach((element:any) => {
      this.admin.firstName=element.firstName;
      this.admin.lastName=element.lastName;
    });

  }

  logout() {
    sessionStorage.removeItem("isLoggedin");
    this.router.navigate(['']);
  }

  async getSkillsets() {
    this.skills = await this.service.getSkillsets();
  }
  async getTrainers() {
    this.trainers = await this.service.getTrainers();

  }
  async getSessions() {
    this.sessions = await this.service.getSessions(this.id);
  }
  async getSessionsBySkillType() {
    if (this.skillType == "all") {
      this.getSessions();
    }
    else {
      this.sessions = await this.service.getSessionsBySkillType(this.skillType);
    }


  }
  addSessionView() {
    this.view = [false, true, false, false, false];
    this.session = new Session();
  }
  addTrainerView() {
    this.view = [false, false, true, false, false];
    this.trainer = new Trainer();
  }
  addSkillSetView() {
    this.view = [false, false, false, true, false];
    this.skill = new SkillSet();
  }
  gotoHome() {
    this.view = [true, false, false, false, false];
  }

  async getAvailableTrainers() {
    this.availableTrainers = await this.service.getAvailableTrainers(this.session.sessionDate, this.session.slot, this.session.skillType);
  }

  async addSession() {
    if (this.validateSessionData()) {
      this.trainers.forEach((trainer: any) => {
        if (trainer.trainerId == this.session.trainer.trainerId) {
          this.session.trainer.skillType = trainer.skillType;
          this.session.trainer.trainerName = trainer.trainerName;
        }
      });
      if (this.session.sessionId == null) {
        let response = await this.service.addSession(this.session, this.id);
        if (response[0] == "success") {
          window.alert("Successfully added");
          this.getSessions();
          this.gotoHome();
        }
      }
      else {
        this.updateSessioninBackend();
      }
    }
  }

  async addTrainer() {
    if (this.validateTrainerData()) {
      if (this.trainer.trainerId == null) {
        let response = await this.service.addTrainer(this.trainer);
        if (response[0] == "success") {
          window.alert("Successfully added");
          this.getTrainers();
          this.gotoHome();
        }
      }
      else {
        this.UpdateTrainerinBackend();
      }

    }
  }

  async addSkillSet() {
    if (this.validateSkillsetData()) {
      let response = await this.service.addSkillSet(this.skill);
      if (response[0] == "success") {
        window.alert("Successfully added");
        this.getSkillsets();
        this.gotoHome();
      }
    }
  }

  validateSessionData(): boolean {
    //description Validation
    if (this.session.sessionDescription == null) {
      this.message1 = "Description is Required";
      return false;
    }
    else if (this.session.sessionDescription.length < 5) {
      this.message1 = "Minimum name length allowed is 5";
      return false;
    }
    for (let i = 0; i < this.session.sessionDescription.length; i++) {
      const ch = this.session.sessionDescription.charAt(i);
      if (ch == "0" || ch == "1" || ch == "2" || ch == "3" || ch == "4" || ch == "5" || ch == "6" || ch == "7" || ch == "8" || ch == "9") {
        this.message1 = "Invalid input";
        return false;
      }
    }
    this.message1 = "";

    //SkillSet Validations
    if (this.session.skillType == null) {
      this.message2 = "Skill Set is Required";
      return false;
    }

    //slot Validations
    if (this.session.slot == null) {
      this.message3 = "Slot is Required";
      return false;
    }

    //trainer validation
    if (this.session.slot == null) {
      this.message4 = "Trainer is Required";
      return false;
    }
    return true;
  }

  validateTrainerData(): boolean {
    //trainer name  validations
    if (this.trainer.trainerName == null) {
      this.message1 = "Trainer Name is Required";
      return false;
    }
    else if (this.trainer.trainerName.length < 3) {
      this.message1 = "Minimum name length allowed is 3";
      return false;
    }
    for (let i = 0; i < this.trainer.trainerName.length; i++) {
      const ch = this.trainer.trainerName.charAt(i);
      if (ch == "0" || ch == "1" || ch == "2" || ch == "3" || ch == "4" || ch == "5" || ch == "6" || ch == "7" || ch == "8" || ch == "9") {
        this.message1 = "Invalid input";
        return false;
      }
    }
    this.message1 = "";

    //skillset vallidations
    if (this.trainer.skillType == null) {
      this.message2 = "Skill Set is Required";
      return false;
    }

    //email validations
    if (this.trainer.email == null) {
      this.message3 = "email is required";
      return false;
    }
    let count = 0;
    for (let i = 0; i < this.trainer.email.length; i++) {
      const ch = this.trainer.email.charAt(i);
      if (ch == "@") {
        count++;
      }
    }
    if (count != 1) {
      this.message3 = "Invalid";
      return false;
    }
    if (this.trainer.email.slice(-4) != ".com") {
      this.message3 = "Invalid";
      return false;
    }
    this.message3 = ""

    //contact Number validations
    if (this.trainer.contactNumber == null) {
      this.message4 = "Contact Number is required";
      return false;
    }
    for (let i = 0; i < this.trainer.contactNumber.length; i++) {
      const ch = this.trainer.contactNumber.charAt(i);
      if (ch == "0" || ch == "1" || ch == "2" || ch == "3" || ch == "4" || ch == "5" || ch == "6" || ch == "7" || ch == "8" || ch == "9") {
        continue;
      }
      else {
        this.message4 = "Invalid";
        return false;
      }
    }
    if (this.trainer.contactNumber.length != 10) {
      this.message4 = "10 digits are expected in contact number.";
      return false;
    }
    if (this.trainer.contactNumber.charAt(0) == "7" || this.trainer.contactNumber.charAt(0) == "8" || this.trainer.contactNumber.charAt(0) == "9") { }
    else {
      this.message4 = "Contact Number should start with 7/8/9";
      return false;
    }

    this.message4 = "";
    return true;
  }

  validateSkillsetData(): boolean {
    if (this.skill.skillType == null) {
      this.message1 = "Skill set Required."
      return false;
    }
    if (this.skill.skillDescription == undefined) {
      this.skill.skillDescription = "-";
    }

    return true;
  }

  updateSession(sessionId: number) {
    this.session = new Session();
    for (let i = 0; i < this.sessions.length; i++) {
      const element = this.sessions[i];
      if (element.sessionId == sessionId) {
        this.session.sessionId = element.sessionId;
        this.session.sessionDescription = element.sessionDescription;
        this.session.sessionDate = element.sessionDate;
        this.session.slot = element.slot;
        this.session.trainer.trainerName = element.trainerName;
        this.session.skillType = element.skillType;
      }
    }
    this.view = [false, true, false, false, false];
  }

  async updateSessioninBackend() {


    let response = await this.service.updateSession(this.session);
    if (response[0] == "success") {
      window.alert("Updated Successfully.");
      this.getSessions();
      this.view = [true, false, false, false, false];
    }
  }

  updateTrainer(trainerId: number) {


    this.trainer = new Trainer();
    for (let i = 0; i < this.trainers.length; i++) {
      const element = this.trainers[i];
      if (element.trainerId == trainerId) {
        this.trainer.trainerId = element.trainerId;
        this.trainer.contactNumber = element.contactNumber;
        this.trainer.email = element.email;
        this.trainer.skillType = element.skillType;
        this.trainer.trainerName = element.trainerName;
      }
    }

    this.view = [false, false, true, false, false];
  }

  async UpdateTrainerinBackend() {

    let response = await this.service.updateTrainer(this.trainer);
    if (response[0] == "success") {
      window.alert("Updated Successfully.");
      this.getTrainers();
      this.view = [true, false, false, false, false];
    }
  }

  async delete(name: String, id: number) {
    let input;
    switch (name) {
      case "skillset":
        input = prompt("If you delete skill set you cannot search based on that skill set. Enter 'delete' to Delete: (case-sensitive)");
        break;
      default:
        input = prompt("Enter 'delete' to Delete: (case-sensitive)");
        break;
    }

    if (input != null && input == "delete") {
      let response = await this.service.delete(name, id);
      if (response[0] == "success") {
        window.alert("Deleted Successfully.");
        this.getSessions();
        this.getTrainers();
        this.getSkillsets();
        this.view = [true, false, false, false, false];
      }
    }
  }

  async sessionDetails(session: any) {
    this.session = new Session();
    this.session.sessionDescription = session.sessionDescription;
    this.session.sessionDate = session.sessionDate;
    this.session.slot = session.slot;
    this.session.skillType = session.skillType;
    this.session.trainer.trainerName = session.trainerName;


    this.enrolledUsers = await this.service.getEnrolledUsers(session.sessionId);
    this.attendedUsers = await this.service.getAttendedUsers(session.sessionId);
    this.view = [false, false, false, false, true];
  }
}
