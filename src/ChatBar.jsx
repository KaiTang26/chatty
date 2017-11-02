import React, {Component} from 'react';



class ChatBar extends Component{

  constructor(props){

    super(props);

    this.state={
      username: "Anonymous",
      content: "",
    }
  }


  render(){

    console.log("rending <charbar>")

    return(


      <dic>
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Name (optional)" onChange={this._changeUserName} value={this.state.username} onKeyPress={this._handleNameKeyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this._changeContent}  value={this.state.content} onKeyPress={this._handleTextKeyPress}/>
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

  _handleTextKeyPress = (e) => {

    if (e.key === 'Enter' && this.state.content) {

      this.props.postSave(
        {
          username: this.state.username,
          content: this.state.content

        })
      this.setState({content: ''})

      console.log('do validate');
    }

  }

  _handleNameKeyPress = (e) => {

    if (e.key === 'Enter' && this.props.name !== this.state.username) {

      if(this.state.username){

        this.props.postSave(
        {
          username: this.state.username,
        })

      }else{

        this.setState({username:"Anonymous"}, ()=>{

          this.props.postSave({username: this.state.username})
        })

      }
         console.log('do validate');
    }

  }




}

export default ChatBar;