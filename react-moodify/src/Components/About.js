import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
    }

    return (
      <div>
      <section id="about">
      <Container maxWidth="lg">
      <div className="row">
         <div className="three columns">
         <h2>About Project</h2>
         </div>
      </div>
      <br />
      

      <div className="row">
      <hr />
         <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Nordic Giant Profile Pic" />
            <p>{bio}</p>      
         </div>
      </div>
   </Container>
   </section>

   <section id="contact">
   <Container maxWidth="lg">
      <div className="row">
         <div className="three columns">
         <h2>Contact Details</h2>
         </div>
      </div>
      <br />
      <div className="row">
      <hr />
      <p className="address">
						   <span>{name}</span><br />
						   <span>{street}<br />
						         {city} {state}, {zip}
                   </span><br />
						   <span>{phone}</span><br />
                     <span>{email}</span>
					   </p>
      </div>
   </Container>
   </section>
   </div>
    );
  }
}

export default About;
