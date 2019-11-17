import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.module.css';
import * as action from '../../store/action/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

class Authentication extends Component{
    state={
        controls:{
            email:{
                elementType:'Input',
                elementConfig:{
                    type:'email',
                    placeholder:'EMAIL-ADDRESS'
                },
                value:'',
                isValidation:{
                    required:true,
                    
                },
                isvalid:false,
                touched:false
            },
            password:{
                elementType:'Input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                isValidation:{
                    required:true,
                    minlength:6,
                    maxlength:16
                },
                isvalid:false,
                touched:false
            },
            
        },
        signUP:true
    }
    componentDidMount(){
        if(!this.props.burgerBuilder &&this.props.setAuthRedirectPath!=='/'){
            this.props.onsetAuthRedirect();
        }
    }

    CheckValidation=(value,rules)=>{
        let isvalid=true;

        if(!rules){
            return isvalid;
        }
        if(rules.required){
            isvalid=value.trim()!==''  &&isvalid;
        }
        if(rules.minlength2){
            isvalid=value.length>=rules.minlength &&isvalid;
        }
        if(rules.maxlength2){
            isvalid=value.length<=rules.maxlength &&isvalid;
        }

       return isvalid;

    }

    changeHandlers=(event,controlName)=>{
        const updatedControl={
            ...this.state.controls
        };
         const updatedControlContain={
                ...updatedControl[controlName]
            };
            updatedControlContain.value=event.target.value;
            updatedControlContain.isvalid=this.CheckValidation(updatedControlContain.value,updatedControlContain.isvalidation);
            updatedControlContain.touched=true;
            updatedControl[controlName]=updatedControlContain;
            this.setState({controls:updatedControl}); 
            }
        
           onSubmitHandler=(event)=>{
               event.preventDefault();
               this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.signUP);
           } 

           switchSignUpHandler=()=>{
               this.setState(prevState=>{
                   return {signUP:!prevState.signUP}

               }

               )
           }

render(){
    let formElement=[];
    for(let key in this.state.controls){
        formElement.push({
            id:key,
            config:this.state.controls[key]
        })
    }

        let form=(
        <form onSubmit={this.onSubmitHandler}>
        {formElement.map(form=>{
                return(
                <Input
                 key={form.id}
                 elementType={form.config.elementType}
                elementConfig={form.config.elementConfig}
                value={form.config.value}
               changed={(event)=>this.changeHandlers(event,form.id)}
               invalid={!form.config.isvalid}
               validation={form.config.isValidation}
               touched={form.config.touched}
                />)
             }
             ) }
            <Button btnType='Success'>SUBMIT</Button>
            </form>);
        
             if(this.props.loading){
                 form=<Spinner/>
             }

             let errorMessage=null;
             if(this.props.error){
                 errorMessage=(<p style={{color:'red',fontSize:'20px'}}>{this.props.error.message}</p>);
             }

             let redirectAuth=null;
             if(this.props.isAuthenticated){
                redirectAuth=<Redirect to ={this.props.setAuthRedirect}/>
             }
   
    return(
        <div className={classes.Controls}>
            {redirectAuth}
            {errorMessage}
            <h2>LOGIN</h2>
            {form}
            <Button btnType="Danger" clicked={this.switchSignUpHandler}>SWITCH TO {this.state.signUP?'SIGNIN':'SIGNUP'}</Button>
        </div>
    )
}
}
export const mapStateToProps=state=>{
    return{
        loading:state.AuthReducer.loading,
        error:state.AuthReducer.error,
        isAuthenticated:state.AuthReducer.token!==null,
        burgerBuilder:state.burgerReducer.building,
        setAuthRedirect:state.AuthReducer.authRedirectPath
        
    }
}

export const dispatchStateToProps=dispatch=>{
return{
    onAuth:(email,password,isSignup)=>dispatch(action.auth(email,password,isSignup)),
    onsetAuthRedirect:()=>dispatch(action.setAuthRedirectPath('/'))
}
}

export default connect(mapStateToProps,dispatchStateToProps)(Authentication);