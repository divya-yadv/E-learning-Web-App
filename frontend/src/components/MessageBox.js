import { Alert } from 'react-bootstrap';

export default function MessageBox(props) {
  return (
    <Alert className="mg-5" variant={props.variant || 'info'}>
      {props.children}
    </Alert>
  );
}
