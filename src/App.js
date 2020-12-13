import './App.css';
import React from "react";

import QrScan from './components/QrScan'


import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);

function App() {

  //state to hold qr codes
  const [qrcs, setQrcs] = React.useState([])

  //state to hold form data
  const [createForm, setCreateForm] = React.useState({
    num: '',
    discount: ''
  })

  //function to make api call to get the qr codes
  const getQrcs = async () => {
    const response = await fetch("http://localhost:3000/qrcs")
    const data = await response.json()
    setQrcs(data);
  }

  //this is going to run the getQrs function when components loads
  React.useEffect(() => {
    getQrcs()
  }, [])

  const loaded = () => (
    <>
    {qrcs.map((qrc) => {
      return (
        <div id='discounts'>
          <h4>Discount: {qrc.discount}</h4>
          <h5>Code: {qrc.num}</h5>
          
          <button onClick={async () => {
              //Make delete request
              await fetch("http://localhost:3000/qrcs/" + qrc.id, {
                method: "delete"
              })
              //get updated list of Qr codes
              getQrcs()
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
    await fetch("http://localhost:3000/qrcs", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(createForm)
    })
    //fetching an updated list of QR codes
    getQrcs()
    //resets the form
    setCreateForm({
      num: "",
      discount: ""
    })
  }

  return (
    <div className="App">          
    <AmplifySignOut />

    <h3>New QR Code</h3>
    <div id='qrwindow'><QrScan /></div>

    <form onSubmit={handleCreate}>
      <input id='scaninput' type="text" name="num" placeholder="QR Scan or Manual entry" value={createForm.num} onChange={createChange} />
      <input id='discount' type="text" name="discount" placeholder="Offer" value={createForm.discount} onChange={createChange} />
      <input type="submit" value="Create QR" id="createbutton" />
    </form>

    <h3>Your QR Codes</h3>
    {qrcs.length > 0 ? loaded(): <h5>There are no QR codes</h5>}
    </div>
  );
}

export default withAuthenticator(App)
