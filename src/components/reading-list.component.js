import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Reading = props => (
  <tr>
    <td>{props.reading.username}</td>
    <td>{props.reading.description}</td>
    <td>{props.reading.duration}</td>
    <td>{props.reading.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.reading._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteReadings(props.reading._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ReadingList extends Component {
  constructor(props) {
    super(props);

    this.deleteReadings = this.deleteReadings.bind(this);

    this.state = { readings: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/readings/")
      .then(response => {
        this.setState({ readings: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteReadings(id) {
    axios
      .delete("http://localhost:5000/readings/" + id)
      .then(response => console.log(response.data));

    this.setState({
      readings: this.state.readings.filter(el => el._id !== id)
    });
  }

  readingList() {
    return this.state.readings.map(currentreading => {
      return (
        <Reading
          reading={currentreading}
          deleteReadings={this.deleteReadings}
          key={currentreading._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Readings</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.readingList()}</tbody>
        </table>
      </div>
    );
  }
}
