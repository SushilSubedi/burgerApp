import React from 'react';
import classes from './Input.module.css';

const input=(props)=>{

    let inputElement=null;
    const inputClasses=[classes.inputElement];
    if(props.invalid && props.validation &&props.touched){
        inputClasses.push([classes.invalid]);
    }
 
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    }
    switch(props.elementType){
            case('input'):
            inputElement=(<input className={inputClasses.join(' ')}
                 {...props.elementConfig} 
                 value={props.value} 
                 onChange={props.changed}/>
                 )
            break;
            case('textarea'):
            inputElement=(<textarea className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}onChange={props.changed}/>)
            break;
            case('select'):
            inputElement=(
            <select className={inputClasses.join(' ')} 
                value={props.value}onChange={props.changed}>
                    {props.elementConfig.option.map(option=>{
                        return <option key={option.value} value={option.value}>{option.displayValue}</option>
                    })}
                    </select>)
            break;
            default:
            inputElement=(<input className={inputClasses.join(' ')} 
                {...props.elementConfig}
                 value={props.value}onChange={props.changed}
                />)

    }

    return(
        <div className={classes.Input}>
            <label className={classes.label}><strong>{props.label}</strong></label>
                {inputElement}
                {validationError}
        </div>
    )
}
export default input;