import React, { Component } from 'react';
import axios from 'axios';

export default class Post extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            post: []
        }
    }

   callApi = e => {
       const url = "http://localhost:9000/api/posts";
       axios.get(url).then(res => {
           const post = res.data;
           this.setState({post})
   })
   }

   componentDidMount() {
       this.callApi();
   }
    
    render() {
        const {post} = this.state;
       const data = post.map(post => (
        <div key={post._id}>
            <div className="text-info">{post.title}</div>
            <div>{post.description}</div>
        </div>
       ))
        return (
            <div>
               {data}
            </div>
        )
    }
}
