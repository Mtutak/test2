import * as React from 'react';
import { ProfileForm } from './ProfileForm';
// import { notification } from 'antd';
import { Modal } from 'react-bootstrap';
import * as axios from 'axios'; // axios should be replaced with helpers
import { helpers } from '../../utils/helpers';
import Auth from '../../../modules/localAuth';

class ProfileButton extends React.Component {
        handleSubmit(data) {
            // this.setState({formVisible: !this.state.formVisible});
            this.close();
            this.props.submitAction(data);
        }
       
        // Initial State       
        componentWillMount() {
            this.setState({
                showModal: false
            });
        }
        close() {
            this.setState({ showModal: false });
        }
        open() {
            this.setState({ showModal:true });
        }        
        render() {
            return (
                <div>
                <center>
                    <button
                        onClick={() => this.open()}
                        className="btn edit-me" 
                        id="userProfileForm" 
                        type="submit"
                        name="contact"
                    >
                    Edit My Profile
                    </button>
                </center>
                
                    <Modal show={this.state.showModal} onHide={() => this.close()}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        {
                        <Modal.Body>
                        <ProfileForm 
                        loading={this.props.loading} 
                        submitAction={(postObj) => this.handleSubmit(postObj)} 
                        id = {this.props.id}
                        profileimg = {this.props.profileimg}
                        bio = {this.props.bio}
                        detail =  {this.props.detail}
                        title = {this.props.title}
                        location = {this.props.location}
                        />
                        {/*: null */}
                        
                        </Modal.Body>
                        }
                        <Modal.Footer>
                            <button className="close-button" onClick={() => this.close()}>Close</button>
                        </Modal.Footer>
                    </Modal>
                
                </div>
            
            );
        }
}


export  { ProfileButton };