import * as React from 'react';
import { Header } from '../children/Header';
import Auth from '../../modules/localAuth';
import { Link } from 'react-router';
import { ProfileButton } from '../children/userprofbtn/ProfileButton';
import { helpers } from '../utils/helpers';

class UserProfile extends React.Component {
    initializeState() {

      this.setState({
              myFirstName: '',
              myLastName:'',
              myEmail: '',
              profileimg: '',
              bio: '',
              detail: '',
              title: '',
              location: ''
      });
    }

    componentWillMount() {
      this.initializeState();
    }

    sendSuccessNotification() {
        notification['success']({
        message: 'Yayyy!!',
        description: 'Your post has been created.',
        });
    }

    sendErrorNotification() {
        notification['error']({
        message: 'Uh Oh',
        description: 'Something went wrong, please try again.',
        });
    }

    getMyInfo(){
        const who = this.props.location.query.friend;

        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/myInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const nameArray = xhr.response.name.split(' ');

            this.setState({
              myFirstName: nameArray[0],
              myLastName: nameArray[1],
              myEmail: xhr.response.email
            });

          }
        });
        xhr.send();  

        // this.setState({
        //     who:this.props.location.query.friend
        // });
    }
    // Data Request Methods
        updateProfile(postObj) {
            var id = this.state.id;
            console.log('this is userid', id);
            // this.startLoading();
            helpers.updateUserProfile(id, postObj).then((profile) => {
                console.log('Post Form Success!');
                //profile is the response object returned after mongoose
                console.log(profile.data);
                this.setState({
                    profileimg: profile.data.profileimg,
                    bio: profile.data.bio,
                    detail: profile.data.detail,
                    title: profile.data.title,
                    location: profile.data.location
                });
                
                // this.sendSuccessNotification();
                // this.endLoading();
                // this.redirectToPosts();
              })
              .catch((error) => {
                console.log('Error With Post Form Project')
                // this.sendErrorNotification();
                // this.endLoading();
              });
        }
        getUserId(){

            const xhr = new XMLHttpRequest();
            xhr.open('get', '/api/userprofile');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            // set the authorization HTTP header
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log(xhr.response);
                this.setState({
                id: xhr.response._id,
                profileimg: xhr.response.profileimg,
                bio: xhr.response.bio,
                detail: xhr.response.detail,
                title: xhr.response.title,
                location: xhr.response.location
            });
            console.log(this.state);
            }
            });
            xhr.send();

        }



    componentDidMount(){
        this.getMyInfo();
        // These seem like redundant tasks but didn't want to overwrite your work - will discuss in class
        this.getUserId();
    }

    render() {
        return(

        <div>
            <Header />
            <div id="user-bg" className="section-padding">
                <div className="container">

                    <div id="about" className="section-padding">
                       <div className="container">
                          <div className="row">
                              <div className="col-6 col-md-4">
                                 <h1 className="firstname">{this.state.myFirstName}</h1>
                              </div>
                              <div className="col-6 col-md-4">
                                 <center><img src={this.state.profileimg} className="img-responsive img-style" /></center>
                              </div>
                              <div className="col-6 col-md-4">
                                  <h1 className="lastname">{this.state.myLastName}</h1>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-title text-center">
                                <h1 className="line-adjustment job-style">{this.state.title}</h1>
                    </div>

                    <div>
                        <center><h3 className="line-adjustment description-style-line">{this.state.bio}</h3></center>
                    </div>

                    <hr />

                    <div>
                        <center><Link to="#" className="btn projects-me">My Projects <i className="fa fa-star-o"></i></Link></center>
                        <center><h3 className="line-adjustment description-style">{this.state.location}</h3></center>
                    </div>

                    <ProfileButton
                        loading={this.state.loading} 
                        submitAction={(postObj) => this.updateProfile(postObj)} 
                        id = {this.state.id}
                        profileimg = {this.state.profileimg}
                        bio = {this.state.bio}
                        detail =  {this.state.detail}
                        title = {this.state.title} 
                        location = {this.state.location}
                        />

                </div>
            </div>
        </div>
        );
    }
}

export default UserProfile;