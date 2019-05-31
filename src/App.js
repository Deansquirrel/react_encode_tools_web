import React, {Component} from 'react';
import {Button, LocaleProvider} from 'antd';
import { Form,Input,Icon,Row,Col } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "antd/dist/antd.css";
import "./App.css"

const FormItem = Form.Item

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
                <h1>Test</h1>
                <EFromContainer />
            </div>
        )
    }
}


class FromContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isDisable:true,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values)=> {
           if (err) {
               console.log(err)
           } else {
               console.log('Received values of form: ', values);
           }
        });
    }


    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={"FormContainer"}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('requestText',{
                            rules:[{required:true,message:"request text can not be empty"}]
                        })(
                            <Input autoFocus={true} size={"large"} prefix={<Icon type={"edit"} theme="filled" style={{color:'rgba(0,0,0,.25'}}/>} placeholder={"Text"} />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('requestKey',{
                            rules:[{required:true,message:"request key can not be empty"}]
                        })(
                            <Input size={"large"} prefix={<Icon type={"lock"} theme="filled" style={{color:'rgba(0,0,0,.25'}}/>} placeholder={"Text"} />,
                        )}
                    </FormItem>
                    <Row gutter={16}>
                        <Col span={6}><Button size={"large"} type={"primary"}>重置</Button></Col>
                        <Col span={6}>&nbsp;</Col>
                        <Col span={6}><Button size={"large"} type={"primary"}>加密</Button></Col>
                        <Col span={6}><Button size={"large"} type={"primary"}>解密</Button></Col>
                    </Row>
                </Form>
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