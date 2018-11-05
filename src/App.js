import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input';
import Start from './Start';
import SubInput from './SubInput';
const test = require('./test')
const dataBase = require('./db')




class App extends Component {
  state = {
    data : [],
    data1 : []
  };
  componentDidMount() {
    
    if(!localStorage.forms) {
      localStorage.forms = JSON.stringify([]);
    };
    let data = JSON.parse(localStorage.forms);
    this.setState({data});
    let data1 = dataBase.openDB()
    data1.then((data) => this.setState({data1:data}))
    
  };
  


  componentDidUpdate() {
    let data = this.state.data;
    localStorage.forms = JSON.stringify(data);
    
  }
  

  addToDB = () => {
    let data = this.state.data;
    localStorage.forms = JSON.stringify(data);
  }

  findToken = (obj, subInput) => {
    
    const keys = Object.keys(obj);
    const data = this.state.data;
    if(subInput.parentToken) {

      for(let key of keys) {
        if(key === 'token' && obj[key] === subInput.parentToken){
          let subInputs = [];
          let newData = [];
          for(let sub of obj.subInputs) {
            if(sub.token !== subInput.token){
              subInputs.push(sub)
            };
          };
          obj.subInputs = subInputs;
          for(let dat of data) {
            newData.push(dat)
          };
          this.setState({data:newData})  
        }else if (Array.isArray(obj[key])) {
          for(let objNext of obj[key]) {
            this.findToken(objNext, subInput)
          };
        };
      }  ;

    } else {

      let newData = [];
      for(let obj of data) {
        if(obj.token !== subInput.token) {
          newData.push(obj)
        };
      };
      this.setState({data:newData}) 
    };
  };

  delete = (subInput) => {
    for(let obj of this.state.data) {
      this.findToken(obj, subInput)
    };
  };

  createRandomString = (strLength) => {
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength) {
      const posaibleCharacters = 'abcdefghijklmnoprstquwyz0123456789';
      let str = '';
      for(let i = 1; i <= strLength; i++) {
        const randomCharacter = posaibleCharacters.charAt(Math.floor(Math.random() * posaibleCharacters.length));
        str += randomCharacter;
      };
      return str;
    };
  };

  addInput = () => {
    let token = this.createRandomString(10);
    let data = this.state.data;
    data.push({token:token, subInputs : []})
    dataBase.add({token:token, subInputs : []})

    this.setState({data:data});

    let data1 = dataBase.get()
    data1.then( data => this.setState({data1:data}))
    test.print()
    
    // console.log(dataBase.data)
  }
  

  changeSubInput = () => {
    let data = this.state.data
    this.setState({data:data})
    this.addToDB();
    
  }
  render() {
    const {data}  = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Form builder</h1>
          
        </header>
        
        {(data.length > 0)?
        (<ol>{data.map((input)=><li key={input.token}>
          <Input 
            changeSubInput={this.changeSubInput}
            input={input}
            addInput={this.addInput}
            createRandomString={this.createRandomString}
            delete={this.delete}
          />
          
          {(input.subInputs)?
            (<ol>{input.subInputs.map((subInput, index) =>  
              <li key={index}>
                  <SubInput 
                    subInput={subInput}
                    changeSubInput={this.changeSubInput}
                    createRandomString={this.createRandomString}
                    delete={this.delete}
                  />    
              </li>
              )}
            </ol>):(<div></div>)
          }
        </li>)}

        </ol>
        ):<div></div>}
        
        <Start 
          data={data}
          addInput={this.addInput}
        />
      </div>
    );
  }
}

export default App;
