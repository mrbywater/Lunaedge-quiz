import { Container, Title, Text, Button, Group } from '@mantine/core';
import './ErrorPage.scss';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container className="errorPageMainContainer">
      <div className="label">404</div>
      <Title className="title">You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className="description">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Link to={'/'}>
          <Button variant="light" size="md">
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default ErrorPage;
