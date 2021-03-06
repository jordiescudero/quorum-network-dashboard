import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNodeList } from './nodeList.actions';
import { env } from '../../env';

class NodeList extends Component {

  componentDidMount() {
    this.props.getNodeList();
    this.startPoll();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  startPoll() {
    const getNodeList = this.props.getNodeList;
    this.timeout = setInterval(function () {
      getNodeList()
    }, env.pollPeriod);
  }

  render() {
    return (
      <table className="pt-table pt-striped full-width">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>IP</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.nodeList.nodes.map((node, i) => {
              return (
                <tr key={"node-detail-" + i}>
                  <td>{node.id}</td>
                  <td>{node.name}</td>
                  <td>{node.accountAddress}</td>
                  <td>{node.host}</td>
                  <td> {
                    node.isConnected
                    ? <span className="pt-tag pt-intent-success">Connected</span>
                    : <span className="pt-tag pt-intent-danger">Disconnected</span>
                  }
                  </td>
                  <td>
                    {
                      !node.isVerified && node.UserId ===  this.props.login.user.id
                      ? <Link to={'/nodes/' + node.id + '/confirm'}>
                          <button type="button" className="pt-button">Confirm Node</button>
                        </Link>
                      : <span></span>
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    nodeList: state.nodeList,
    login: state.login
  };
}

export default connect(mapStateToProps, {getNodeList})(NodeList);
