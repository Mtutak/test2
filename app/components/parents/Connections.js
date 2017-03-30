import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Header } from '../children/Header';
import ApiService from '../utils/helpers';
import Auth from '../../modules/localAuth';
import { Link } from 'react-router';

class Connections extends React.Component {
    
    initializeState() {

      this.setState({
        connectionsMade: [],
        connectionsAvailable: [],
        connectionsPending: []
      });
    }

    componentWillMount() {
      this.initializeState();
    }

    getUsersConnections(){

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/connections/made');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          connectionsMade: xhr.response.connectionsMade
        });
      }
    });
    xhr.send();

    }

    getAvailableConnections(){

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/connections/available');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          connectionsAvailable: xhr.response.connectionsAvailable
        });
      }
    });
    xhr.send();

    }

    getPendingConnections(){

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/connections/pending');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          connectionsPending: xhr.response.pendingConnections
        });
      }
    });
    xhr.send();

    }

    componentDidMount(){

      this.getUsersConnections();
      this.getPendingConnections();
      this.getAvailableConnections();

    }

    render() {
        return(
        	<div>
            <Header />
            <div id="blackbg-banner" className="section-padding">
                <div className="container text-center">
                        <h3 className="title">Connections You've Made</h3>
                </div>
	        <center><Card className="container card-container">
            <div className="row">
                 <div className="col-lg-12">
                   <div className="row">
		           
		         {this.state.connectionsMade.map(function(search, i) {
	                return (
                    <div className="col-lg-4" id="connections-box">
	                  <div key={search.id}>

	    	              		 
	    	              		 <Link 
                            to={
                                { 
                                  pathname: '/friendsProfile/query', 
                                  query: { 
                                    friend: search._id 
                                  } 
                                }
                              } 
                            activeClassName='active' >

                            <h2 className="connections-name">{search.name}</h2>

                            </Link>

	    	              		 <h4 className="connections-email">{search.email}</h4>

	                      <br />
	                    </div>
                      </div>
                      
	                );
	              })}
                </div>
                </div>
                </div>


	        </Card></center>

                <div className="container text-center">
                        <h3 className="title">Connections Around You</h3>
                </div>
        

          <center><Card className="container card-container">
             <div className="row">
                 <div className="col-lg-12">
                   <div className="row">
               
             {this.state.connectionsAvailable.map(function(search, i) {
                  return (
                    <div className="col-lg-4" id="connections-box">
                    <div key={search.id}>

                           
                           <Link 
                            to={
                                { 
                                  pathname: '/friendsProfile/query', 
                                  query: { 
                                    friend: search._id 
                                  } 
                                }
                              } 
                            activeClassName='active' >

                            <h2 className="connections-name">{search.name}</h2>

                            </Link>

                           <h4 className="connections-email">{search.email}</h4>

                        <br />
                      </div>
                      </div>
                  );
                })}
                </div>
                </div>
                </div>



          </Card></center>

                <div className="container text-center">
                        <h3 className="title awaiting-meetup">Awaiting Meetup</h3>
                </div>

          <center><Card className="container card-container">
                <div className="row">
                 <div className="col-lg-12">
                   <div className="row">

             {this.state.connectionsPending.map(function(search, i) {
                  return (
                    <div className="col-lg-4" id="connections-box">
                    <div key={search.id}>

                           
                           <Link 
                            to={
                                { 
                                  pathname: '/friendsProfile/query', 
                                  query: { 
                                    friend: search._id 
                                  } 
                                }
                              } 
                            activeClassName='active' >

                            <h2 className="connections-name">{search.name}</h2>

                            </Link>

                           <h4 className="connections-email">{search.email}</h4>

                            <Link 
                            to={
                                { 
                                  pathname: '/connections/query', 
                                  query: { 
                                    friend: search._id 
                                  } 
                                }
                              } 
                            activeClassName='active' > 
                              <h5 className="link-up">LINK UP!</h5>
                            </Link>
                        <br />
                      </div>
                      </div>
                  );
                })}
                </div>
                </div>
                </div>
                

          </Card></center>

          {this.props.children}



	        </div>
        </div>
        );
    }
}

export default Connections;