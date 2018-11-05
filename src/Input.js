import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import './Input.css';


class Input extends Component {
    
    addSubInput = (e) => {
        e.preventDefault();
        const type = e.target.getElementsByTagName('select')[0];
        const values = serializeForm(e.target, {hash: true});
        let subInput = this.props.input;
        let subInputs = subInput.subInputs;
        let token = this.props.createRandomString(10);
        
        if(values.question && type.value !== '') {
            subInput.question = values.question;
            subInput.type = type.value;
            subInputs.push({token, parentType: type.value, parentToken:this.props.input.token});
            subInput.subInputs = subInputs;
            this.props.changeSubInput();
        }else {
            alert('You must fill in all fields')
        }
        
    };

    delete = (e) => {
        e.preventDefault();
        this.props.delete(this.props.input);
    };

    change = (e) => {
        let input = this.props.input;
        let key = e.target.name;
        input[key] = e.target.value;
        
        this.props.changeSubInput();
    };

    render () {
        const {input} = this.props
        return (
            <div>
                <div className="input_question">
                    <form onSubmit={this.addSubInput}>    
                        <label>Question:</label> 
                        <input type="text" name="question" defaultValue={input.question} onChange={this.change}></input>
                        <label>Type:</label>

                        <select id="type" name="type" defaultValue={input.type} onChange={this.change}>
                            <option></option>
                            <option>Text</option>
                            <option>Yes / No</option>
                            <option>Number</option>
                        </select>  
                        
                        <div id="sub">
                            <input type="submit" value="Add Sub-Input"></input>
                            <button onClick={(e)=>this.delete(e)}>Delete</button>
                        </div>
                    </form>
                </div>    
            </div>
        )
    };
};

export default Input;