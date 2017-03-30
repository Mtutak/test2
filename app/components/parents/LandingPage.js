import * as React from 'react';
import { Link } from 'react-router';
import Auth from '../../modules/localAuth';
// import { Header } from '../parents/Header';

 class LandingPage extends React.Component {
    render() {
        return(

<div>
	{/*<!--HEADER START-->*/}
	<div className="main-navigation navbar-fixed-top">
		<nav className="navbar navbar-default">
			<div className="container">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			  </button>
			  <a className="navbar-brand" href="index.html">Tribe</a>
			</div>
			<div className="collapse navbar-collapse" id="myNavbar">

                              {Auth.isUserAuthenticated() ? (
                                    <ul className="nav navbar-nav">
                                        <li><Link to='/profile' activeClassName='active' >Profile</Link></li>
                                        <li><Link to='/projects' activeClassName='active' >Explore</Link></li>
																				<li><Link to='/projects/new' activeClassName='active' >Create</Link></li>
                                        <li><Link to='/connections' activeClassName='active' >Connections</Link></li> 
                                        <li><Link to='/logout' activeClassName='active' >Log out</Link></li>
                                    </ul>
                              ) : (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="active"><Link to='/login' activeClassName='active' >Login</Link></li>
                                    </ul>
                              )}

			</div>
		  </div>
		</nav>
	</div>
	{/*<!--HEADER END-->*/}

	{/*<!--BANNER START-->*/}
	<div id="banner" className="section-padding">
		<div className="container">
			<div className="row">
				<div className="jumbotron">
				  <h1 className="small">Welcome To <span className="bold">Tribe</span></h1>
				  <p className="big">A community for artists to connect and work together</p>
				  <Link to="/signup" className="btn btn-banner">Sign Up<i className="fa fa-send"></i></Link>
				</div>
			</div>
		</div>
	</div>
	{/*<!--BANNER END-->*/}

</div>
    );
  }
}

export default LandingPage;

