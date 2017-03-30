import * as React from 'react';
import { Header } from './Header';
import Auth from '../../modules/localAuth';
import { Link } from 'react-router';
import { ProfileButton } from './userprofbtn/ProfileButton';

class FriendsProfileComponents extends React.Component {
    initializeState() {

      this.setState({
              friendsFirstName: '',
              friendsLastName:'',
              friendsEmail: ''
      });
    }

    componentWillMount() {
      this.initializeState();
    }

    addToPendingConnections(event) {
        // event.preventDefault();
      // console.log(this);
        const who = this.props.location.query.friend;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/friendRequest');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        // xhr.addEventListener('load', () => {
        //   if (xhr.status === 200) {
        //     console.log('success');

        //   }
        // });
        xhr.send('id='+who); 
    }

    getFriendsInfo(){
        const who = this.props.location.query.friend;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/friendsInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const nameArray = xhr.response.name.split(' ');

            this.setState({
              friendsFirstName: nameArray[0],
              friendsLastName: nameArray[1],
              friendsEmail: xhr.response.email
            });

          }
        });
        xhr.send('id='+who);  

        // this.setState({
        //     who:this.props.location.query.friend
        // });
    }



    componentDidMount(){
        this.getFriendsInfo();

    }

    render() {
        return(
        <div>
            <Header />
            <div id="blackbg-banner" className="section-padding">
                <div className="container">

                    <div id="about" className="section-padding">
                       <div className="container">
                          <div className="row">
                              <div className="col-6 col-md-4">
                                 <h1 className="firstname">{this.state.friendsFirstName}</h1>
                              </div>
                              <div className="col-6 col-md-4">
                                 <center><img src="/img/profile-placeholder.png" className="img-responsive img-style" /></center>
                              </div>
                              <div className="col-6 col-md-4">
                                  <h1 className="lastname">{this.state.friendsLastName}</h1>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-title text-center">
                                <h1 className="line-adjustment job-style">Job Title</h1>
                    </div>

                    <div>
                        <center><h3 className="line-adjustment description-style">This is what I do and what kind of people I am looking to connect with.</h3></center>
                    </div>

                    <hr />

                    <div>
                     <center><Link onClick={(event) => this.addToPendingConnections(event)} to='/meet' className="btn connect-me">Connect <i className="fa fa-handshake-o"></i></Link></center>
                    </div>

                    <div>
                        <center><Link to="#" className="btn projects-me">Projects <i className="fa fa-star-o"></i></Link></center>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}

export default FriendsProfileComponents;