import React from 'react';
import { Link } from 'react-router';
import Auth from '../../modules/localAuth';
import { Card, CardTitle, CardText } from 'material-ui/Card';
// import Dashboard from '../children/Dashboard.js';


class MeetInstructions extends React.Component {

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <header className="main-header" id="header">
            <div className="bg-color">
                {/*<!--nav-->*/}
                <nav className="nav navbar-default">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mynavbar" aria-expanded="false" aria-controls="navbar">
                                <span className="fa fa-bars"></span>
                            </button>
                                <a href="/" className="navbar-brand">TRIBE</a>
                            </div>
                            <div className="collapse navbar-collapse navbar-right" id="mynavbar">

                                  {Auth.isUserAuthenticated() ? (
                                        <ul className="nav navbar-nav">
                                            <li><Link to='/profile' activeClassName='active' >Profile</Link></li>
                                            <li><Link to='/projects' activeClassName='active' >Explore</Link></li>
                                            <li><Link to='/projects/new' activeClassName='active' >Create</Link></li> 
                                            <li><Link to='/connections' activeClassName='active' >Connections</Link></li>
                                            <li><Link to='/logout' activeClassName='active' >Log out</Link></li>
                                        </ul>
                                  ) : (
                                        <ul className="nav navbar-nav">
                                            <li><Link to='/signup' activeClassName='active' >Sign Up</Link></li>
                                            <li className="active"><Link to='/login' activeClassName='active' >Login</Link></li>
                                        </ul>
                                  )}

                            </div>
                        </div>
                    </div>
                </nav>
                <br/>
                <div className="container text-center">
                </div>
            </div>
        </header> 

        <Card className="container">
          <CardTitle
            title="Awesome!"
            subtitle="Your request has been submitted!"
          />

        <CardText style={{ fontSize: '16px', color: 'green' }}>
        A scheduling email was sent to both of you.  When you are together in person, go to the      
          <Link 
            to='/connections' 
            activeClassName='active' >
               - Connections Page - 
          </Link>         
              and click on "LINK UP". </CardText>
        </Card>

    </div>

      );
  }

}

export default MeetInstructions;