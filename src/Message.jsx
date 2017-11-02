import React, {Component} from 'react';

class Message extends Component{

  render(){

    console.log("message");

    let outMessage="";

    if(this.props.type==="incomingNotification"){


      outMessage=<div className="message system">
                  {this.props.content}
                </div>
    }else{

      outMessage=<div className="message">
                    <span className="message-username">{this.props.username}</span>
                    <span className="message-content">{this.props.content}</span>
                  </div>
    }

    return(



      <div>

            {outMessage}

      </div>

      )

  }
}

export default Message;