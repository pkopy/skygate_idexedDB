import React, { Component } from 'react';
import './Input.css';
import serializeForm from 'form-serialize';

class SubInput extends Component {

    
    addSubInput = (e) => {
        
        e.preventDefault();
        const type = e.target.querySelector('#type');
        const yesNo = e.target.querySelector('#yes-no');
        const condition = e.target.querySelector('#equals');
        const values = serializeForm(e.target, {hash: true});
        let subInput = this.props.subInput;
        let subInputs = subInput.subInputs || [];
        let token = this.props.createRandomString(10);

        if(subInput.parentType === 'Yes / No'){
            values.answer = yesNo.value ||'YES';
        };

        if(values.question && values.answer && type.value !== '') {
            subInput.question = values.question;
            subInput.answer = values.answer;
            subInput.equals = (!condition) ?  'Equals' : condition.value;
            subInput.type = type.value;
            subInputs.push({token, parentType: type.value, parentToken : this.props.subInput.token});
            subInput.subInputs = subInputs;
            this.props.changeSubInput();
        } else {
            alert('You must fill in all fields')
        }
        
    }
    change = (e) => {
        let subInput = this.props.subInput;
        let key = e.target.name;
        subInput[key] = e.target.value;
        this.props.changeSubInput();
    };

    delete = (e) => {
        e.preventDefault();
        this.props.delete(this.props.subInput);
    };

    render () {
        const {subInput, changeSubInput, createRandomString} = this.props;
        
        return (
            <div>
                <div className="input_question">
                    <form onSubmit={this.addSubInput} >    
                        <label>Condition:</label> 
                            {(subInput.parentType === 'Text' || subInput.parentType === 'Yes / No') ? 
                                <div id="answer">
                                    <select>
                                        <option >Equals</option>
                                    </select>
                                    {(subInput.parentType === 'Text') ? (<input type="text" name="answer" defaultValue={subInput.answer} onChange={this.change}></input>) : 
                                    (<select id="yes-no" name="answer"defaultValue={subInput.answer} onChange={this.change}>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>)}
                                    
                                </div>
                                : 
                                <div id="answer">
                                    <select id="equals" name="equals" defaultValue={subInput.equals} onChange={this.change}>
                                        <option>Equals</option>
                                        <option>Greater than</option>
                                        <option>Less than</option>
                                    </select>
                                    <input  type="number" name="answer" defaultValue={subInput.answer} onChange={this.change}></input>
                                </div>
                            }
                        
                        <label>Question:</label> 
                        <input type="text" name="question" placeholder="Question..." defaultValue={subInput.question} onChange={this.change}></input>
                        <label>Type:</label>
                        
                        <select id="type" name="type" defaultValue={subInput.type} onChange={this.change}>
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
                {(subInput.subInputs)?
                    (<ol>{subInput.subInputs.map((subInput, index) =>
                        <li key={index}>
                            <SubInput 
                                subInput={subInput}
                                changeSubInput={changeSubInput}
                                createRandomString={createRandomString}
                                delete={this.props.delete}
                            />        
                        </li>
                        )}
                    </ol>):(<div></div>)
                }
            </div>
        )
    }
}

export default SubInput