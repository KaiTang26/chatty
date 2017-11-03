import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props){

    super(props);

    this.state={
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
         messages: [],
         userNumber: 0,
         color:"#00ff00"
    }



  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);

   this.ws = new WebSocket("ws://localhost:3001");

   const color=["#00ff00", "#ff0000", "#0040ff", "#6600cc", "#ffff00", "#FFBD33", "#3396FF", "#33FFC4", "#33FFB2", "#B8FF33"];

   const i = this._colorPicker();

   console.log(color[i])

   this.ws.onopen=(ev)=>{

    this.setState({color:color[i]},()=>{

    });


     console.log('Connected to server');
   }

   this.ws.onmessage=(ev)=>{
      const newMessages = this.state.messages;

      const message = JSON.parse(ev.data);

      switch(message.type){

        case "incomingNotification":

          newMessages.push(message);

          this.setState({messages:newMessages})

          console.log(message);

          break;

        case "incomingMessage":

          newMessages.push(message);

          this.setState({messages:newMessages})

          break;

        case "userNumber":

          this.setState({userNumber: message.userNumber})

          break;

        default:

          throw new Error(`Unknown event type ${message.type}`)


      }



    }

 }


  render() {

    console.log("rending <app>");
    return (


      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user-number">{this.state.userNumber} users online</p>
      </nav>

      <MessageList {...this.state}/>

      <ChatBar {...this.state.currentUser} postSave={this._postSave}/>

      </div>
    );
  }

  _postSave = (e) => {



    // console.log(e);

    if(e.username!==this.state.currentUser.name){


      const userA = this.state.currentUser.name;

      this.setState({currentUser:{name: e.username}}, ()=>{

        const userB = this.state.currentUser.name;

        const message ={
          type: "postNotification",
          content: `${userA} has changed their name to ${userB}`,
        }

        this.ws.send(JSON.stringify(message));

      });


    }else{

      const message ={
          type: "postMessage",
          username: e.username,
          content: e.content,
          color: this.state.color
        }

      this.ws.send(JSON.stringify(message));

    }



  }

  _colorPicker =()=>{

      const i = Math.floor(Math.random() * (9 - 0) + 0);

      return i;
    }

}
export default App;
