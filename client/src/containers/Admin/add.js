import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearNewBook} from '../../actions';

class AddBook extends Component {

    state={
        formdata:{
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'1',
            price:''
        }
    }

    handleInput=(e,name)=>{
        console.log(e);
        const newFormdata={
            ...this.state.formdata
        }
        newFormdata[name]=e.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    submitForm = (e)=>{
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))

    }
    showNewBook=(book)=>(
        book.post?
            <div className='conf_link'>
                cool!!<Link to={`/books/${book.bookId}`}>
                    Click the link to see the book
                </Link>
            </div>
        :null
    )

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }
    
    render() {
        console.log(this.props.books)
        return (
            <div className='rl_container article'>
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

                    <div className='form_element'>
                        <input
                            type="text"
                            placeholder="enter name"
                            value={this.state.formdata.name}
                            onChange={(e)=>this.handleInput(e, 'name')}
                        />
                    </div>
                    <div className='form_element'>
                        <input
                            type="text"
                            placeholder="enter author"
                            value={this.state.formdata.author}
                            onChange={(e)=>this.handleInput(e, 'author')}
                        />
                    </div>
                    <textarea
                        value={this.state.formdata.review}
                        onChange={(e)=>this.handleInput(e, 'review')}
                        />
                    <div className='form_element'>
                        <input
                            type="number"
                            placeholder="enter pages"
                            value={this.state.formdata.pages}
                            onChange={(e)=>this.handleInput(e, 'pages')}
                        />
                    </div>
                    <div className='form_element'>
                        <select
                            value={this.state.formdata.rating}
                            onChange={(e)=>this.handleInput(e, 'rating')}
                        >
                            <option val='1'>1</option>
                            <option val='2'>2</option>
                            <option val='3'>3</option>
                            <option val='4'>4</option>
                            <option val='5'>5</option>
                        </select>
                    </div>
                    <div className='form_element'>
                        <input
                            type="number"
                            placeholder="enter price"
                            value={this.state.formdata.price}
                            onChange={(e)=>this.handleInput(e, 'price')}
                        />
                    </div>
                    <button type='submit'>Add review</button>
                    {
                        this.props.books.newbook ?
                        this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        books:state.books
    }
}

export default connect(mapStateToProps)(AddBook);