import React from 'react';
import { Container, Table, Card, Image, Header, Grid } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class AthleteProfile extends React.Component {

  /** Render the Profile page */
  render() {
    return (
        <Container className='profile-page-container'>
          <Card fluid centered>
            <Card.Content textAlign='center'>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                  <hr/>
                </Grid.Column>
                  <Grid.Column>
                    <Image centered size='medium' circular
                           src="https://www.ics.hawaii.edu/wp-content/uploads/2018/08/peter-sadowski_300x300.jpg"/>
                  </Grid.Column>
                  <Grid.Column>
                    <hr/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><hr/></Grid.Column>
                  <Grid.Column>
                    <Header as='h1' textAlign='center'>Peter Sadowski</Header>
                  </Grid.Column>
                  <Grid.Column><hr/></Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content extra>
              <Table singleLine unstackable inverted>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={3}>Sport</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Age</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Height</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Weight</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Graduation</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Major</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Football</Table.Cell>
                    <Table.Cell>21</Table.Cell>
                    <Table.Cell>6&apos;5</Table.Cell>
                    <Table.Cell>200 lbs</Table.Cell>
                    <Table.Cell>2021</Table.Cell>
                    <Table.Cell>Communication</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

export default AthleteProfile;
