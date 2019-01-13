import React from "react";
import {Form, Button} from "semantic-ui-react";
import isEmail from 'validator/lib/isEmail';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component{
    state={
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    }

    onChange = event => {
        this.setState({
            data: {...this.state.data, [event.target.name]: event.target.value}
        })
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length===0) {
            this.passData(this.state.data);
        }
    }

    passData = (data) => {
        console.log(data);
    }

    validate = data => {
        const errors = {};
        if (!isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Enter Password";
        return errors;
    }

    render(){
       const {data, errors} = this.state; 
        return(
            <Form onSubmit={this.onSubmit} >
                <Form.Field error={!!errors.email} >
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@example.com"
                    value={data.email} onChange={this.onChange} />
                   {errors.email && <InlineError text={errors.email} /> } 
                </Form.Field>    
                <Form.Field error={errors.password} >
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password"
                    value={data.password} onChange={this.onChange} />
                   {errors.password && <InlineError text={errors.password} /> } 
                </Form.Field>    
                <Button primary >Submit</Button>
            </Form>
        );
    }
}

export default LoginForm;