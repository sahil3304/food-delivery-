import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBCard>
      <MDBCardImage src='https://www.poornima.edu.in/wp-content/uploads/2020/08/greentick.jpg' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Your Order Has Been Accpeted
          Order ID:543217
          Ammount:500
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}