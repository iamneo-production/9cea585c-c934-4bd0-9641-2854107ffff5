import React from 'react';
import { Container } from 'react-bootstrap';

function Navfooter() {
  return (
    <footer style={{ background: '#333', color: '#fff', padding: '10px 0' }}>
      <Container
        style={{
          textAlign: 'center',
        }}
      >
        RE ©2023 Created by Team 32!
      </Container>
    </footer>
  );
}

export default Navfooter;
