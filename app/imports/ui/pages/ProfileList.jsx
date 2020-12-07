import React from 'react';
import _ from 'lodash';
import { Container, Divider, Header, Loader, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import ProfileListEntry from '../components/ProfileListEntry';
import state from 'sweetalert';

/** Renders a table containing all of the profiles. Use <Profile> to render each row. */
class ProfileList extends React.Component {

  /** Semantic UI React Sort function. */
  exampleReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.reverse(),
            direction:
                state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: this.props.profiles,
    direction: null,
  });
  const { column, data, direction } = state;

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the Profile page */
  renderPage() {
    return (
        <Container id="profileList-page">
          <Divider hidden/>
          <Table size='large' celled padded striped stackable singleLine sortable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='8' textAlign='center'>
                  <Header>Profile List</Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>
                  Athlete
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'lastName' ? direction : null}
                                  onClick={() => dispatch({
                                    type: 'CHANGE_SORT',
                                    column: 'lastName' })}>
                  Last Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'firstName' ? direction : null}
                                  onClick={() => dispatch({
                                    type: 'CHANGE_SORT',
                                    column: 'firstName' })}>
                  First Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'sport' ? direction : null}
                                  onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'sport' })}>
                  Sport
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'age' ? direction : null}
                                  onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'age' })}>
                  Age
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'graduation' ? direction : null}
                                  onClick={() => dispatch({
                                    type: 'CHANGE_SORT',
                                    column: 'graduation' })}>
                  Year
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'major' ? direction : null}
                                  onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'major' })}>
                  Major
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Profile
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {data.map((profile) => <ProfileListEntry key={profile._id} profile={profile}/>)}
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider hidden/>
        </Container>
    );
  }

// }
}

/** Require an array of Stuff documents in the props. */
ProfileList.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const subscription = Meteor.subscribe(Profiles.adminPublicationName);
  return {
    profiles: Profiles.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ProfileList);
