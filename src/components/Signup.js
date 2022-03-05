import React from "react";

export default class SignUp extends React.Component {

    state = {
        
    }


    // TODO: perform axios request and populate the state. 
    
    
    handleSubmit(){
        // On submite a 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <label>Email</label>
                    <input type="text" />
                    <br />
                    <label>Password</label>
                    <input type="password" />
                    <br />
                    <button>Sign in</button>
                </form>
            </div>
        )
    }
}