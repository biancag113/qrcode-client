import './App.css';
import React from "react";

import QrScan from './components/QrScan'


import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);

function App() {

  //state to hold qr codes
  const [qrs, setQrs] = React.useState([])

  //state to hold form data
  const [createForm, setCreateForm] = React.useState({
    store: '',
    code: ''
  })

  //function to make api call to get the qr codes
  const getQrs = async () => {
    const response = await fetch("http://localhost:3000/qrs")
    const data = await response.json()
    setQrs(data.reverse());
  }

  //this is going to run the getQrs function when components loads
  React.useEffect(() => {
    getQrs()
  }, [])

  const loaded = () => (
    <>
    {qrs.map((qr) => {
      return (
        <div>
          
          <h5>Store: {qr.store}</h5>
          <h6>Code: {qr.code}</h6>
          

          <button onClick={async () => {
              //Make delete request
              await fetch("http://localhost:3000/qrs/" + qr.id, {
                method: "delete"
              })
              //get updated list of Qr codes
              getQrs()
            }}>Delete</button>
        </div>
      );
    })}
    </>
    );

  //the handlechange for the create form
  const createChange = (event) => {
    setCreateForm({...createForm, [event.target.name]: event.target.value})
  }

  //our handle create function, for when the form is submitted
  const handleCreate = async (event) => {
    event.preventDefault() //prevent page refresh
    //making the post request to create a new QR codes
    await fetch("http://localhost:3000/qrs", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(createForm)
    })
    //fetching an updated list of QR codes
    getQrs()
    //resets the form
    setCreateForm({
      store: "",
      qr: ""
    })
  }

  return (
    <div className="App">          
    <AmplifySignOut />
    <h3>New QR Code</h3>
    <div id='qrwindow'><QrScan /></div>
    <form onSubmit={handleCreate}>
      <input type="text" name="store" value={createForm.store} onChange={createChange} />
      <input type="text" name="code" value={createForm.code} onChange={createChange} />
      <input type="submit" value="Create QR" />
    </form>
    <h3>Your QR Codes</h3>
    {qrs.length > 0 ? loaded(): <h5>There are no QR codes</h5>}
    </div>
  );
}

export default withAuthenticator(App)
