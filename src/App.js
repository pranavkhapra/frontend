import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/partial/Navbar";
import Logout from "./components/partial/Logout";
import Home from "./components/main/Home";
import ChangePassword from "./components/profile/ChangePassword";

import AddClassForm from "./components/class/AddClassForm";
import ClassList from "./components/class/ListOfClasses";
import EditClassForm from "./components/class/EditClassForm";
import ClassDetail from "./components/class/ClassDetail";

import AddStudentForm from "./components/student/AddStudentForm";
import EditStudentForm from "./components/student/EditStudentForm";
import StudentList from "./components/student/StudentList";
import StudentLoginForm from "./components/student/StudentLoginForm";
import StudentDetails from "./components/student/StudentDetail";

import AddTeacherForm from "./components/teacher/AddTeacherForm";
import EditTeacherForm from "./components/teacher/EditTeacherForm";
import TeacherList from "./components/teacher/TeacherList";
import TeacherLoginForm from "./components/teacher/TeacherLoginForm";
import TeacherDetail from "./components/teacher/TeacherDetail";

import AdminList from "./components/admin/AdminList";
import AdminLoginForm from "./components/admin/AdminLoginForm";
import AdminSignUpForm from "./components/admin/AdminSignUpForm";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>

          <Route path="/classes/edit/:class_name" component={EditClassForm}/>
          <Route path="/classes" exact component={ClassList}/>
          <Route path="/classes/add" component={AddClassForm}/>
          <Route path="/classes/details/:class_name" component={ClassDetail}/>

          <Route path="/admins" exact component={AdminList}/>
          <Route path="/admins/login" component={AdminLoginForm}/>
          <Route path="/admins/signup" component={AdminSignUpForm}/>
          
          <Route path="/students" exact component={StudentList}/>
          <Route path="/students/edit/:student_id" component={EditStudentForm}/>
          <Route path="/students/add" component={AddStudentForm}/>
          <Route path="/students/login" component={StudentLoginForm}/>
          <Route path="/students/details/:student_id" component={StudentDetails}/>

          <Route path="/teachers" exact component={TeacherList}/>
          <Route path="/teachers/edit/:teacher_id" component={EditTeacherForm}/>
          <Route path="/teachers/add" component={AddTeacherForm}/>
          <Route path="/teachers/login" component={TeacherLoginForm}/>
          <Route path="/teachers/details/:teacher_id" component={TeacherDetail}/>

          <Route path="/change-password" component={ChangePassword}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
