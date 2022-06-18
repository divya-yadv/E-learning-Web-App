import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function MessageBox(props) {
  const [clicked, setClicked] = useState(false);
  function closeWarning() {
    setClicked(true);
  }
  return (
    <div>
      {!clicked && (
        <Alert
          className="mg-5 alert alert-warning alert-dismissible fade show"
          variant={props.variant || 'info'}
        >
          {props.children}
          <button
            onClick={closeWarning}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </Alert>
      )}
    </div>
  );
}
