import React, {Component} from 'react';

import Message from './Message.jsx'

class MessageList extends Component{




  render(){

    console.log("list");
    // const messages =this.props;

    //   const message = messages.map((obj)=>

    //   console.log(obj)

    //   )


    return(

      <div>
        <main className="messages">

        { this.props.messages.map((obj)=>{

          return <Message {...obj} key={obj.id}/>

        })}

        </main>

      </div>

      )
  }
}


export default MessageList;