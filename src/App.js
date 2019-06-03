import React, {Component} from 'react';
import {Button, LocaleProvider} from 'antd';
import { Form,Input,Icon,Row,Col,message,Descriptions } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "antd/dist/antd.css";
import "./App.css"
import $ from 'jquery'

const FormItem = Form.Item;

export default App;



function App(){
    return (
        <LocaleProvider locale={zhCN}>
            <div className={"rootContainer"}>
                <RootContainer />
            </div>
        </LocaleProvider>
    )
}

class RootContainer extends Component {
    render(){
        return (
            <div className={"RootContainer"}>
                <EFromContainer />
            </div>
        )
    }
}


class FromContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            address:"",
            isDisable:false,
            oprType:0,
            showResult:false,
        }
    }

    componentWillMount() {
        $.ajax({
            url:'../../config.json',
            cache:false,
            dataType:'json',
            success:function(data){
                this.setState({
                    address:data["address"]
                });
            }.bind(this),
            error:function(e){
                console.log(e.toString());
                this.setState({
                    address:""
                });
            }.bind(this)
        });
    }

    componentDidMount() {
        FromContainer.resetFocus()
    }

    static resetFocus(){
        document.getElementById("formContainer_requestText").focus();
    }

    handleReset = () => {
        this.props.form.resetFields();
    };

    showForm(){
        FromContainer.resetFocus()
        this.setState({
            showResult:false,
        });
    }

    updateOprType(oprType){
        this.setState({
            oprType:oprType,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
           this.props.form.validateFields((err,values)=> {
           if (!err) {
               if(this.state.address === ""){
                   message.warn("online address is empty,please wait...",3);
                   return
               }

               let d = {};
               d.requesttext = values["requestText"];
               d.requestkey = values["requestKey"];
               d.oprtype = this.state.oprType;

               const hide = message.loading("action in progress..",0);

               $.ajax({
                   type:'POST',
                   url:this.state.address + "/code",
                   data:JSON.stringify(d),
                   dataType:'json',
                   timeout:30000,
                   contentType:'application/json',
                   cache:false,
                   sync:true,
                   beforeSend:function(){
                       this.setState({
                           isDisable:true,
                       });
                   }.bind(this),
                   complete:function(){
                       this.setState({
                           isDisable:false,
                           oprType:0,
                       });
                       setTimeout(hide,0)
                       FromContainer.resetFocus();
                   }.bind(this),
                   success: function (data) {
                       if(data["errcode"]===0){
                           message.info(data["responsetext"],5)
                       } else {
                           message.error(data["errmsg"],3)
                       }
                       this.props.form.resetFields();
                       this.setState({
                           showResult:true,
                       })
                   }.bind(this),
                   error:function(xhr,status,e) {
                       console.log(e);
                       message.error("[" + xhr.status + "]" + status + ":"+ e.toString(),3)
                   }
               })
           }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={"FormContainer"}>
                <Form style={{display:this.state.showResult?"block":"block"}} onSubmit={this.handleSubmit}>
                    <h1>Coding</h1>
                    <FormItem>
                        {getFieldDecorator('requestText',{
                            rules:[{required:true,message:"request text can not be empty"}]
                        })(
                            <Input
                                id={"inputText"}
                                disabled={this.state.isDisable}
                                autoFocus={true}
                                size={"large"}
                                prefix={
                                    <Icon
                                        type={"edit"}
                                        theme="filled"
                                        style={{color:'rgba(0,0,0,.25'}}
                                    />
                                }
                                placeholder={"Text"}
                            />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('requestKey',{
                            rules:[{required:true,message:"request key can not be empty"}]
                        })(
                            <Input
                                disabled={this.state.isDisable}
                                size={"large"}
                                prefix={
                                    <Icon
                                        type={"lock"}
                                        theme="filled"
                                        style={{color:'rgba(0,0,0,.25'}}
                                    />
                                }
                                placeholder={"Key"}
                            />,
                        )}
                    </FormItem>
                    <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                        <Col xs={7} sm={6} md={5}>
                            <Button
                                disabled={this.state.isDisable}
                                size={"large"} type={"primary"}
                                onClick={this.handleReset}>
                                Reset
                            </Button>
                        </Col>
                        <Col xs={1} sm={6} md={9}>&nbsp;</Col>
                        <Col xs={8} sm={6} md={5}>
                            <Button
                                htmlType={"submit"}
                                disabled={this.state.isDisable}
                                style={{float:"right"}} size={"large"} type={"primary"}
                                onClick={()=>{this.updateOprType(1)}}>
                                Encrypt
                            </Button>
                        </Col>
                        <Col xs={8} sm={6} md={5}>
                            <Button
                                htmlType={"submit"}
                                disabled={this.state.isDisable}
                                style={{float:"right"}} size={"large"} type={"primary"}
                                onClick={()=>{this.updateOprType(2)}}>
                                Decrypt
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div style={{display:this.state.showResult?"block":"none"}}>
                    <h1>Result</h1>
                    <Descriptions>
                        <Descriptions.Item label="Text">Zhou Maomao</Descriptions.Item>
                        <br/>
                        <Descriptions.Item label="Key">1810000000</Descriptions.Item>
                    </Descriptions>
                    <div>
                        &nbsp;
                        <Button
                            style={{float:"right"}} size={"large"} type={"primary"}
                            onClick={()=>{this.showForm()}}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const EFromContainer = Form.create({ name: 'formContainer' })(FromContainer);

//
// class FormContainer extends React.Component {
//
//     constructor(props){
//         super(props);
//         this.state={
//             address:"",
//         }
//     }
//
//     componentWillMount() {
//         $.ajax({
//             url:'../../config.json',
//             cache:false,
//             dataType:'json',
//             success:function(data){
//                 console.log(data)
//                 this.setState({
//                     address:data["address"]
//                 });
//             }.bind(this),
//             error:function(e){
//                 console.log(e.toString())
//                 this.setState({
//                     address:""
//                 });
//             }.bind(this)
//         });
//     }
//
//     render(){
//         return (
//             <div className={"FormContainer"}>
//                 <p style={{marginLeft:'10px'}}>{this.state.user}</p>
//             </div>
//         )
//     }
//
//     // onSearch(value){
//     //     this.setState({
//     //         updatePhone:value
//     //     });
//     //     this.getJsonResult(value)
//     // }
//
//     // getJsonResult(updatePhone){
//     //     let d = {};
//     //     d.phone = updatePhone;
//     //     // console.log(JSON.stringify(d));
//     //     const serverUrl= this.state.address + "/text";
//     //     $.ajax({
//     //         type:'POST',
//     //         url:serverUrl,
//     //         data:JSON.stringify(d),
//     //         dataType:'json',
//     //         timeout:30000,
//     //         contentType:'application/json',
//     //         cache:false,
//     //         sync:true,
//     //         beforeSend:function(){
//     //             this.setState({
//     //                 canDo:false,
//     //                 showResult:false,
//     //             });
//     //         }.bind(this),
//     //         complete:function(){
//     //             this.setState({
//     //                 canDo:true
//     //             });
//     //             const i = document.getElementById("inputSearch");
//     //             i.focus();
//     //         }.bind(this),
//     //         success: function (data) {
//     //             this.setState({
//     //                 updateResult:data['errcode'] === 0?"success":"failed",
//     //                 result:data,
//     //                 showResult:true,
//     //             })
//     //         }.bind(this),
//     //         error:function(xhr,status,e) {
//     //             let errMsg = "[" + xhr.status + "]" + status + ":"+ e.toString();
//     //             this.setState({
//     //                 updateResult:"failed",
//     //                 result:{"errcode":-1,"errmsg":errMsg},
//     //                 showResult:true,
//     //             })
//     //         }.bind(this)
//     //     })
//     // }
// }