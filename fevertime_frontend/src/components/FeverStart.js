import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class FeverStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory:'',
        }
    }

    changeCategory = () => (e) => {
        this.setState({
          selectedCategory: e.target.value
        })
    }



    render() {
        return (
            <div>
                <div className='t-center mt-5 page-title'>Fever mode</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Goal Time</div>
                    <input className='w-30 input-1'/>
                </div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Category</div>
                        <div className="w-10">
                        <label>
                            Category 1 
                            <input type="radio" value="category1"
                                        checked={this.state.selectedCategory === 'category1'} //Category names should be modified
                                        onChange={this.changeCategory()} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Category 2 
                            <input type="radio" value="category2" 
                                        checked={this.state.selectedCategory === 'category2'} 
                                        onChange={this.changeCategory()} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Category 3 
                            <input type="radio" value="category3" 
                                        checked={this.state.selectedCategory === 'category3'} 
                                        onChange={this.changeCategory()} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Category 4 
                            <input type="radio" value="category4" 
                                        checked={this.state.selectedCategory === 'category4'} 
                                        onChange={this.changeCategory()} />
                        </label>
                        </div>
                </div>
                <div className='d-flex d-ho-center mt-5'>
                    <button className='button-orange'><Link to='/feverready'>Go Fever</Link></button>
                </div>
            </div>
        )
    }
}
export default FeverStart;