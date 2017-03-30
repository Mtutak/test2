import React from 'react';
import { Link } from 'react-router';
import Auth from '../../modules/localAuth';
import Dashboard from '../children/Dashboard.js';
import { Card, CardText } from 'material-ui/Card';
import { helpers } from '../utils/helpers';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }
    });
    xhr.send();
  }

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
                        <h3 className="title-showcase">Showcase Projects Here</h3>
                        <Card className="container">
		           
		        {/*  {this.state.connections.map(function(search, i) {
	                return (
	                  <div key={search.id}>

	    	              		 
	    	              		 <h2>{search.name}</h2>
	    	              		 <h4>{search.email}</h4>

	                      <br />
	                    </div>
	                );
	              })}
              */}

	        </Card>
                </div>
            </div>
        </header> 

      <Dashboard secretData={this.state.secretData} />

    </div>

      );
  }

}

export default DashboardPage;