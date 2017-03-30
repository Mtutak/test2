import * as React from 'react';

class Main extends React.Component {
  render() {
    return (
      <div className="main-content">
          {this.props.children}
      </div>
    );
  }
}

export default Main;
