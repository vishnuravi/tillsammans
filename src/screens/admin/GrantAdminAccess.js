import React, { useState } from 'react';
import firebase from 'firebase/app';

import FormInput from '../../components/FormInput';
import Button from 'react-bootstrap/Button';

const GrantAdminAccess = () => {

  // Allows main admins to grant main admin or group admin privileges to any registered user account

  return (
    <React.Fragment>
      <GrantMainAdmin />
      <GrantGroupAdmin />
    </React.Fragment>
  );
};

const GrantMainAdmin = props => {
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultMessage("Processing...");
    var addAdmin = firebase.functions().httpsCallable('addAdmin');
    addAdmin({ email: email }).then(function (result) {
      var resultMessage = result.data.result;
      setResultMessage(resultMessage);
    }).catch(function (error) {
      var code = error.code;
      var errorMessage = error.message;
      var details = error.details;
      setErrorMessage(`${code}: ${errorMessage} - ${details}`);
    })
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  return (
    <div className="sign-in page-layout">

      <h2>Grant main admin privileges</h2>

      <p>{resultMessage} {errorMessage}</p>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="User's e-mail address"
          required
        />
        <Button type="submit" block>
          Process
          </Button>
      </form>

    </div>
  )
}

const GrantGroupAdmin = props => {

  const [email, setEmail] = useState("");
  const [groupID, setgroupID] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultMessage("Processing...");
    var addAdmin = firebase.functions().httpsCallable('addGroupAdmin');
    addAdmin({ email: email, groupID: groupID }).then(function (result) {
      var resultMessage = result.data.result;
      setResultMessage(resultMessage);
    }).catch(function (error) {
      var code = error.code;
      var errorMessage = error.message;
      var details = error.details;
      setErrorMessage(`${code}: ${errorMessage} - ${details}`);
    })
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'groupID') {
      setgroupID(value);
    }
  };

  return (
    <div className="sign-in page-layout">

      <h2>Grant group admin privileges</h2>

      <p>{resultMessage} {errorMessage}</p>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="User's e-mail address"
          required
        />
        <FormInput
          name="groupID"
          type="text"
          handleChange={handleChange}
          value={groupID}
          label="Group ID"
          required
        />
        <Button type="submit" block>
          Process
          </Button>
      </form>

    </div>
  )
}

export default GrantAdminAccess;