import React,{Component} from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
      

        constructor(props){
            super(props);
            this.state={
                error:null
            }

           this.reqInterceptors= axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
                
            })
        }
            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptors);
                axios.interceptors.response.eject(this.resInterceptors);
            }

        cancelerrorHandler=()=>{
            this.setState({error:null})
        }
        render(){
        return(
            <Aux>
            <Modal show={this.state.error}
            modelclosed={this.cancelerrorHandler}>
                {this.state.error?this.state.error.message:null}
            </Modal>
            <WrappedComponent {...this.props}/>
            </Aux>
            
        )
        }
    }
};
export default withErrorHandler;