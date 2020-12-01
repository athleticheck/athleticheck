import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Visit from '../components/Visit';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';
import { Visits } from '../../api/visit/Visits';

/** Renders the Page. */
class AthleteProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderAthleteProfile() : <Loader active>Getting Data</Loader>;
  }

  /** Render the Profile page */
  renderAthleteProfile() {
    return (
        <Container id="profile-page" className='profile-page-container'>
          <Card fluid centered className="profile-page-profile">
            <Profile profile={this.props.profile[0]}/> {/* this MIGHT fix it? */}
          </Card>
          <Container className='profile-page-spacing'>
            <Divider horizontal>
              <Header as='h1' textAlign='center' inverted>VISITS</Header>
            </Divider>
          </Container>
          <Container className='profile-page-spacing'>
            <Card.Group>
              {this.props.visits.length !== 0 ? ( // if there are visits, display them
                  this.props.visits.map((visit, index) => <Visit key={index} visit={visit}/>)
              ) : ( // else, display an empty message
                  <Card fluid>
                    <Card.Content>
                      <Header as='h3' textAlign='center' disabled>
                        No recorded visits with a trainer
                      </Header>
                    </Card.Content>
                  </Card>
              )}
            </Card.Group>
          </Container>
        </Container>
    );
  }
}

/** Require data to be passed to this component. */
AthleteProfile.propTypes = {
  profile: PropTypes.array.isRequired, // should be obj, but see fix on line 24
  visits: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles and Visits documents.
  const ProfilesSubscription = Meteor.subscribe(Profiles.userPublicationName);
  const VisitsSubscription = Meteor.subscribe(Visits.userPublicationName);
  return {
    profile: Profiles.collection.find({}).fetch(),
    visits: Visits.collection.find({}).fetch(),
    ready: ProfilesSubscription.ready() && VisitsSubscription.ready(),
  };
})(AthleteProfile);
