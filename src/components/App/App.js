import React, { Component } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080", { transports: ["websocket"] });

//When form is submitted, send message to our server
//

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: ""
    };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      this.setState(state => ({
        messages: [...state.messages, msg]
      }));
      // () => {
      //   window.scrollTo(0, document.body.scrollHeight);
      // };
    });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState(() => ({
      input: value
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Submitting Report");
    socket.emit("chat message", this.state.input);
    this.setState(() => ({ input: "" }));
  };

  render() {
    return (
      <>
        <ul>
          {this.state.messages.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.input} onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </>
    );
  }
}

export default App;
