create database if not exists AttendanceMarking;
use AttendanceMarking;
Create table login_details(
	loginId int,
    password varchar(45),
    account_type varchar(45)
);
create table admin_details(
	adminId int,
    first_name varchar(45),
    last_name varchar(45),
    age int,
    gender varchar(5),
    contact_number varchar(45),
    my_sessions varchar(455)
);
create table user_details(
	employee_id int,
    first_name varchar(45),
    last_name varchar(45),
    email varchar(45),
    registered_sessions varchar(255),
    attended_sessions varchar(255)
);
create table trainer_details(
	trainer_id int,
    trainer_name varchar(45),
    contact_number varchar(45),
    email varchar(45),
    skill_id int
);
create table session_details(
	session_id int,
    session_description varchar(455),
    skill_id int,
    session_date date,
    session time,
    available_slots varchar(45),
    trainer_id int,
    registerd_users varchar(455),
    attendees varchar(455),
    is_completed char(1)
);
create table skillset_details(
	skill_id int,
    skill_type varchar(45),
    skill_description varchar(455)
);