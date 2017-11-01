import React, {Component} from 'react';



class ChatBar extends Component{

  constructor(props){

    super(props);

    this.state={

      id:4,
      username: "",
      content: "",

    }
  }


  render(){

    console.log("rending <charbar>")

    return(


      <dic>
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Bob" onChange={this._changeUserName} value={this.state.username}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this._changeContent}  value={this.state.content} onKeyPress={this._handleKeyPress}/>
      </footer>
      </dic>



      );

  }



  _changeContent=(e)=>{
      this.setState(
        {content: e.target.value}
        );
    }

  _changeUserName=(e)=>{
      this.setState(
        {username: e.target.value}
        );
    }

  _handleKeyPress = (e) => {

      if (e.key === 'Enter') {

        this.props.postSave(
        {
          id: this.state.id,
          username: this.state.username,
          content: this.state.content

        })

        this.setState(
          {
          id: this.state.id+1,
          username: '',
          content: ''

        })
          console.log('do validate');
        }

    }




}

export default ChatBar;