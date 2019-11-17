import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionType from '../../../store/action/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactOrder extends Component{
state={
    OrderForm:{
        name:{
            elementType:'Input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name'
            },
            value:'',
            isValidation:{
                required:true
            },
            isvalid:false,
            touched:false
        },
        phonenumber:{
            elementType:'Input',
            elementConfig:{
                type:'text',
                placeholder:'Phone Number'
            },
            value:'',
            isValidation:{
                required:true
            },
            isvalid:false,
            touched:false
        },

        street:{
            elementType:'Input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            isValidation:{
                required:true
            },
            isvalid:false,
            touched:false
        },
        PinCode:{
            elementType:'Input',
            elementConfig:{
                type:'text',
                placeholder:'PinCode'
            },
            value:'',
            isValidation:{
                required:true,
                minlength:5,
                maxlength:5
            },
            isvalid:false,
            touched:false
        },
        flatNo:{
            elementType:'Input',
            elementConfig:{
                type:'text',
                placeholder:'flatNumber'
            },
            value:'',
            isValidation:{
                required:true
            },
            isvalid:false,
            touched:false
        },
          feature:{
            elementType:'select',
            elementConfig:{
                option:[{
                    value:'expensive', displayValue:'fastest'},
                    {value:'cheapest', displayValue:'slow'}]
            },
            value:'fastest',
            isValidation:{},
            isvalid:true
        },
      
    },
    formValid:false
}

orderHandler=(e)=>{
    e.preventDefault();
    //alert('You continue');

    const  formData={};
    for(let formElementData in this.state.OrderForm){
        formData[formElementData]=this.state.OrderForm[formElementData].value;
    }

    const order={
      ingredients:this.props.ing,
      price:this.props.price,
      orderData:formData,
      userId:this.props.userId
    }
    this.props.onOrderHandler(order,this.props.token);

}

    CheckValidation=(value,rules)=>{
        let isvalid=true;
        if(!rules){
            return isvalid;
        }
        if(rules.required){
            isvalid=value.trim()!==''  &&isvalid;
        }
        if(rules.minlength){
            isvalid=value.length>=5 &&isvalid;
        }
        if(rules.maxlength){
            isvalid=value.length<=5 &&isvalid;
        }

       return isvalid;

    }

changeHandler=(event,Inputidentifier)=>{
    const updatedOrderForm={
        ...this.state.OrderForm
    };
    const updateFormElement={
        ...updatedOrderForm[Inputidentifier]
    };
    updateFormElement.value=event.target.value;
    updateFormElement.isvalid=this.CheckValidation(updateFormElement.value,updateFormElement.isValidation);
    updateFormElement.touched=true;
    let formValid=true;
    for(let Inputidentifier in updatedOrderForm){
        formValid=updatedOrderForm[Inputidentifier].isvalid&&formValid;
    }
    updatedOrderForm[Inputidentifier]=updateFormElement;
  
        this.setState({OrderForm:updatedOrderForm,formValid:formValid});
}

render(){
    let formElement=[];
    for(let key in this.state.OrderForm){
        formElement.push({
            id:key,
            config:this.state.OrderForm[key]
        })
    }
    let form=null;
    if(this.props.loader){
        form=<Spinner/>
    }
    else{
        form=(
            <form onSubmit={this.orderHandler}>
             {formElement.map(form=>{
                return( <Input
                 key={form.id}
                 elementType={form.config.elementType}
                elementConfig={form.config.elementConfig}
                value={form.config.value}
               changed={(event)=>this.changeHandler(event,form.id)}
               invalid={!form.config.isvalid}
               validation={form.config.isValidation}
               touched={form.config.touched}
                />
                )}
             )}

            <Button btnType='Success' disabled={!this.state.formValid}>Order</Button>
            </form>
        )
    }

    return(
        <div className={classes.ContactOrder}>
        <h3>Contact Information</h3>
        {form}
    </div>
    )
}
}

const mapStateToProps=state=>{
    return{
        ing:state.burgerReducer.ingredients,
        price:state.burgerReducer.TotalPrice,
        loading:state.orderReducer.loading,
        token:state.AuthReducer.token,
        userId:state.AuthReducer.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onOrderHandler:(orderData,token)=>dispatch(actionType.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(withRouter(ContactOrder),axios));