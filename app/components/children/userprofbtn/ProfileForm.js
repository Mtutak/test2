import * as React from 'react';
import { Geo } from '../form/Geo';
import { Modal } from 'react-bootstrap';

class ProfileForm extends React.Component {

  // Form Event Handlers

  updateInput(event) {
    console.log(event.target.value);
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

    handleSubmitForm(event) {
        console.log(this.props.loading);
        console.log('success!');
        event.preventDefault();
        console.log(this.state);
    {/* this is found in CreateProject Component */}
        this.props.submitAction(this.state);
        }



  // Initial State

  initializeState() {
    this.setState({
      id: this.props.id,
      title: this.props.title || '',
      bio: this.props.bio || '',
      detail: this.props.detail || '',
      profileimg: this.props.profileimg || '',
      location: this.props.location || ''
    });
    console.log('id');
    console.log(this.state.id);
  }

  // Lifecycle Methods

  componentWillMount() {
    this.initializeState();
  }


//   componentWillMount() {
//     this.setState({
//         showModal: false
//             });
//         }

  render() {
    return (
        <div id="contact" className="section-padding">
		{/*<div className="container">
			<div className="row">*/}
                <form role="form" className="registration-form" onSubmit={(event) => this.handleSubmitForm(event)}>
                    <fieldset>
                        <div className="page-title text-center">
					<center><h1 className="edit-profile">Edit Your Profile: </h1></center>
					<center><hr className="pg-titl-bdr-btm"></hr></center>
                    <Geo />
				        </div>
                        
                        <div className="form-bottom">
                            <div className="row">
                                 <center><div className="col-lg-12 form-group">
                                    <label htmlFor='profileimg' className="form-fonts">Profile Image:</label><br/>
                                    <center><input 
                                    className='form-control text-field-box form-fonts' 
                                    id='profileimg'
                                    type='text'
                                    defaultValue={this.props.profileimg}
                                     placeholder="Enter a link for your profile image"
                                    onChange={(event) => this.updateInput(event)}
                                    required
                                    /></center>
                                 </div></center>
                                <center><div className="col-lg-12 form-group">
                                    <label htmlFor='title' className="form-fonts">Job:</label><br/>
                                    <center><input 
                                    className='form-control text-field-box form-fonts' 
                                    placeholder="It was all a dream..."
                                    id='title'
                                    type='text'
                                    onChange={(event) => this.updateInput(event)}
                                    defaultValue={this.props.title}
                                    required
                                    /></center>
                                 </div></center>
                                <center><div className="col-lg-12 form-group">
                                    <label htmlFor='bio' className="form-fonts">One Liner:</label><br/>
                                   <center><textarea 
                                    id='bio'
                                    type='text'
                                    onChange={(event) => this.updateInput(event)}
                                    rows="2"
                                    cols="2"
                                    maxLength="50"
                                    required
                                    className="form-control text-field-box" 
                                    placeholder="I used to read Word Up magazine. Salt'n'Pepa and Heavy D up in the limousine"
                                    defaultValue={this.props.bio}
                                    /></center>
                                </div></center>
                                {/*<center><div className="col-lg-12 form-group">
                                    <label htmlFor='detail' className="form-fonts">Details:</label><br/>
                                   <center><textarea 
                                    id='detail'
                                    type='text'
                                    onChange={(event) => this.updateInput(event)}
                                    defaultValue={this.props.detail}
                                    rows="2"
                                    cols="2"
                                    maxLength="250"
                                    required
                                    className="form-control text-field-box" 
                                    placeholder="Super Nintendo, Sega Genesis. When I was dead broke, man I couldn't picture this. 50 inch screen, money green leather sofa"
                                    /></center>
                                </div></center>*/}
                            </div>
                            {/* Update Loading Cursor with this.props.loading bool */}
                            <button 
                                type="primary"
                                className="button-medium save-profile-btn" 
                                onClick={(event) => this.handleSubmitForm(event)}
                                id="contact-submit"                                 
                                name="contact">
                                SAVE
                            </button>
                           
                        </div>
                    </fieldset>
                </form>
            </div>
    //     </div>
    // </div>
    );
  }
}

// Props CreateProjects component
// Requires an "action" function
// Optional "loading" boolean
// Optional "defaultTitle" string
// Optional "defaultbio" string

ProfileForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  defaultTitle: React.PropTypes.string,
  defaultbio: React.PropTypes.string,
  id: React.PropTypes.string,
  profileimg: React.PropTypes.string,
  bio: React.PropTypes.string,
  detail: React.PropTypes.string,
  title: React.PropTypes.string,
  location: React.PropTypes.string
};


export { ProfileForm };
