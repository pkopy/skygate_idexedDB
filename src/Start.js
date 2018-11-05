import React, { Component } from 'react'

class Start extends Component {

    
    render () {
        const {addInput} = this.props
        return(
            <div>
                <button onClick={addInput}>Add Input</button>
            </div>
        )
    }
}

export default Start;