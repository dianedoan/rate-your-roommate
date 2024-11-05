import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ShieldLock, GeoAlt, ChatDots } from 'react-bootstrap-icons';

function Features() {
  return (
    <Container className="features-section text-center mt-5">
      <Row>
        <Col md={4} className="mb-4">
          <ShieldLock size={40} />
          <h5>Reviews are anonymous</h5>
          <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, or a short story.</p>
        </Col>
        <Col md={4} className="mb-4">
          <GeoAlt size={40} />
          <h5>Find roommates in your area</h5>
          <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, or a short story.</p>
        </Col>
        <Col md={4} className="mb-4">
          <ChatDots size={40} />
          <h5>Chat and meet roommates</h5>
          <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, or a short story.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
