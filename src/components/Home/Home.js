import React, { Component } from "react";
// import { Button } from "reactstrap";
import { Navigate } from "react-router-dom";
import QuizComponent from "../Quiz/QuizComponent";

export default class Home extends Component {
  state = {
    navigate: false,
  };

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;

    if (navigate) {
      return <Navigate to="/sign-up" push={true} />;
    }

    return (
      <div className="container border p-4">
        <h3 className="mb-4">Quiz Page</h3>
        <div className="row">
          <div className="col-xl-9 col-md-9">
            <h5 className="text-dark">Welcome, {user.name}!</h5>
          </div>
          {/* <div className="col-xl-3 col-md-3 text-right">
            <Button className="btn btn-primary" onClick={this.onLogoutHandler}>
              Logout
            </Button>
          </div> */}
        </div>
        <div className="row mt-4">
          <div className="col">
            <QuizComponent />
          </div>
        </div>
      </div>
    );
  }
}
