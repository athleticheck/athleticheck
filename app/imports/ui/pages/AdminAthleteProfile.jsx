import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Button, Divider, Loader } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';
import { Visits } from '../../api/visit/Visits';
import Visit from '../components/Visit';

/** Renders the Page. */
class AdminAthleteProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready && this.props.profileId) ? this.renderAdminProfilePage() : <Loader active>Getting Data</Loader>;
  }

  /** Render the Admin Profile page */
  renderAdminProfilePage() {
    // define the profile and visits associated with athlete
    const profile = Profiles.collection.findOne(this.props.profileId);
    const visits = Visits.collection.find({ profileId: this.props.profileId }).fetch();
    return (
        <Container id="adminProfile-page">
          <Container textAlign='center' className="profile-page-spacing">
            <Divider horizontal>
              <Button
                  size='massive' inverted color='green' as={NavLink}
                  activeClassName="active" exact to={`/add-visit/${profile._id}`}>
                Add New Visit
              </Button>
            </Divider>
          </Container>
          <Card fluid centered className="profile-page-profile">
            <Profile profile={profile}/>
            <Card.Content extra>
              <Button fluid as={NavLink} activeClassName="active"
                      exact to={`/edit-profile/${profile._id}`}>
                Edit Profile
              </Button>
            </Card.Content>
          </Card>
          <Container className="profile-page-spacing">
            <Divider horizontal>
            <Header as='h1' textAlign='center' inverted>VISITS</Header>
           </Divider>
          </Container>
          <Container className='profile-page-spacing'>
            <Card.Group>
              {visits.length !== 0 ? ( // if there are visits, display them
                  visits.reverse().map((visit, index) => <Visit key={index} visit={visit}/>)
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
AdminAthleteProfile.propTypes = {
  profileId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const AdminAthleteProfileWithTracker = withTracker(({ match }) => {
  // Get the profileID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const profileId = match.params._id;
  // Get access to Profiles and Visits documents.
  const ProfilesSubscription = Meteor.subscribe(Profiles.adminPublicationName);
  const VisitsSubscription = Meteor.subscribe(Visits.adminPublicationName);
  return {
    profileId: profileId,
    ready: ProfilesSubscription.ready() && VisitsSubscription.ready(),
  };
})(AdminAthleteProfile);
/** Wrap this component in withRouter since we use the <Link> React Router element. */
const AdminAthleteProfileWithRouter = withRouter(AdminAthleteProfileWithTracker);

export default AdminAthleteProfileWithRouter;
