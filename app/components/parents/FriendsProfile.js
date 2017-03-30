import * as React from 'react';
// import FriendsProfComps from '../children/friendsProfComps';

class FriendsProfile extends React.Component {

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default FriendsProfile;