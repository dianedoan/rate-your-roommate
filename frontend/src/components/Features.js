import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ShieldLock, GeoAlt, ChatDots } from 'react-bootstrap-icons';
import './Features.css';

function Features() {
  return (
    <section className="features-section">
      <Container className="features-section text-center">
        <Row>
          <Col md={4} className="">
            <ShieldLock size={40} />
            <h5>Reviews are anonymous</h5>
            <p className="feature">The rating system, each with an optional review, allows users to judge potential roommates based on their past experiences and interactions with other past roommates.</p>
          </Col>
          <Col md={4} className="">
            <GeoAlt size={40} />
            <h5>Find roommates in your area</h5>
            <p className="feature">Users can select their location. This information helps narrow down location-based preferences and makes it easier to connect with nearby users.</p>
          </Col>
          <Col md={4} className="">
            <ChatDots size={40} />
            <h5>Chat and meet roommates</h5>
            <p className="feature">Users have the ability to message one another so they can get to know each other better and for other inquiries.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Features;
