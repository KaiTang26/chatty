import React, {Component} from 'react';

class ChatBar extends Component{

  render(){

    console.log("rending <charbar>")






    return(


      <dic>
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.handleKeyPress}/>
      </footer>
      </dic>



      );


  }




}

export default ChatBar;