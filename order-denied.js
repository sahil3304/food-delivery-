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
      <MDBCardImage src='https://www.dreamstime.com/cross-mark-icon-button-flat-round-symbol-sticker-cross-mark-icon-button-flat-round-symbol-sticker-eps-vector-file-image189330420' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Your Order Has Been Denied
         
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}