// import React from 'react';
// import { Link } from 'react-router';
// import Auth from '../../modules/localAuth';
// import { Card, CardTitle, CardText} from 'material-ui/Card';
// import RefreshIndicator from 'material-ui/RefreshIndicator';
// import * as axios from 'axios';

// const style = {
//   container: {
//     position: 'relative',
//   },
//   refresh: {
//     display: 'inline-block',
//     position: 'relative',
//   },
// };


// class PairInstructions extends React.Component {

//   confirmAndAddConnection(event){
//     if(event.target.value){
//       this.startLoading(function(){});
//         var deviceInfo = {
//           deviceAddress:event.target.value
//         };
//         deviceInfo['friendToAdd'] = this.props.location.query.friend;
//         deviceInfo['loggedInUser'] = this.state.loggedUser;



//         axios.post('/bluetooth/confirm', deviceInfo)
//           .then((data) => {
//             console.log(data.data);
//               this.endLoading();
//               this.context.router.push('/success');
//           })
//           .catch((error) => {
//             this.endLoading();
//           });

//     }

//   }

//   getMyInfo(){

//       const xhr = new XMLHttpRequest();
//       xhr.open('get', '/api/myInfo');
//       xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//       // set the authorization HTTP header
//       xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
//       xhr.responseType = 'json';
//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {

//           this.setState({
//           loggedUser: xhr.response.id 
//           });

//         }
//       });
//       xhr.send();  
//   }  

//   startLoading(callback, args) {
//     this.setState({
//       loading: 'loading'
//     }, () => callback(args));
//   }

//   endLoading() {
//     this.setState({
//       loading: 'hide',
//     });
//   }

//   pairDevices(){

//     axios.get('/bluetooth')
//       .then((data) => {
//         this.endLoading();
//         this.setState({
//           devices:data.data.devices
//         });
//       })
//       .catch((error) => {
//         this.endLoading();
//       });
//   }

//   startPairingProcess(){
//     this.startLoading(()=>
//       this.pairDevices()
//       );
//   }

//   initializeState() {
//     this.setState({
//       loading: 'hide',
//       devices: [],
//       loggedUser:''
//     });
//   }

//   componentWillMount() {
//     this.initializeState();
//     this.getMyInfo();
//     console.log(this);
//   }  
//   /**
//    * Render the component.
//    */
//   render() {
//     return (
//       <div>
//         <Card className="container">
//           <CardTitle
//             title="Ready?"
//             subtitle="Please make sure your bluetooth is turned on."
//           />

//         <CardText style={{ fontSize: '16px', color: 'green' }}>
//         Hold your your devices next to each other and press the button below.  When asked to pair, please accept.  
//           <br/>
//           <button 
//             onClick={(event)=>this.startPairingProcess(event)}
//             type='primary'
//             loading={true}
//             htmlType='submit'
//             >

//             LINK US!
//           </button>

//         </CardText>

//         </Card>


//     <RefreshIndicator
//       size={50}
//       left={70}
//       top={0}
//       loadingColor="#FF9800"
//       status={this.state.loading}
//       style={style.refresh}
//     />

//                 <div className="container text-center">
//                         <h3 className="title">Detected Devices</h3>
//                 </div>

//           <Card className="container">
//                <div onClick={(event)=>this.confirmAndAddConnection(event)}>
//              {this.state.devices.map(function(search, i) {
//                   return (
//                     <div key={search.address}>

//                            <h4>{search.name}</h4>
//                            <button
//                            value={search.address}
//                            >Select</button>


//                         <br />
//                       </div>
//                   );
//                 })}
//              </div>


//           </Card>

//     </div>

//       );
//   }

// }

// PairInstructions.contextTypes = {
//   router: React.PropTypes.any
// };


// export default PairInstructions;