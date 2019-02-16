import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers, userRegister, clearUsers} from '../../actions';

class Register extends Component {

    state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:'',
        checker:0
    }

    handleInputName=(event)=>{
        this.setState({name:event.target.value})
    }
    handleInputLastname=(event)=>{
        this.setState({lastname:event.target.value})
    }
    handleInputEmail=(event)=>{
        this.setState({email:event.target.value})
    }
    handleInputPassword=(event)=>{
        this.setState({password:event.target.value})
    }

    componentWillUnmount(){
        this.props.dispatch(clearUsers())
        // this.setState({checker:0})
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        console.log(state.checker);
        if(!props.user.users || Object.keys(props.user.users).length == 0){
            // props.books.updateBook=false;
            console.log('no user')
            props.dispatch(getUsers());
            return {checker:0, error:''}
        }
        // else if(state.checker==0 || props.books.updateBook){
        //     let book=props.books;
        //     console.log(book)
        //     return {formdata:props.books.book, checker:1}
        // }
        else if(state.checker==1 && props.user.register===false){
            console.log('error' + state.checker)
            return {
                error:'error, try again',
                checker:0
            }
        }
        else if(props.user.register===true){
            console.log('clear'+  + state.checker);
            return {
                name:'',
                lastname:'',
                email:'',
                password:'',
                checker:0,
                error:''
            }
        }
    }

    // shouldComponentUpdate(){

    // }

    submitForm=(e)=>{
        e.preventDefault();
        console.log('check add');
        this.setState({checker:1,error:''});
        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
        },this.props.user.users));
    }

    showUsers=(user)=>(
        user.users ?
            user.users.map(item=>(
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
    )
    
    render() {
        console.log(this.props)
        let user=this.props.user
        return (
            <div className='rl_container'>
                <form onSubmit={this.submitForm}>
                    <h2>Add user</h2>

                    <div className='form_element'>
                        <input
                            type='text'
                            placeholder='enter name'
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                        </div>
                        <div className='form_element'>
                        <input
                            type='text'
                            placeholder='enter Lastname'
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                        </div>
                        <div className='form_element'>
                        <input
                            type='email'
                            placeholder='enter email'
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                        </div>
                        <div className='form_element'>
                        <input
                            type="password"
                            placeholder='enter Password'
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type='submit'>Add user</button>
                    <div className='error'>
                        {this.state.error}
                    </div>
                </form>
                <div className='current_users'>
                    <h4>current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Register);