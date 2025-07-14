import React from 'react'
import DoctorImage from '../assets/image.png'
import './DoctorPage.css'

function DoctorPage() {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to the Doctor's Dashboard</h1>
          <p>Manage your patients and appointments efficiently.</p>
        </div>
        <div className="hero-image">
          <img src={DoctorImage} alt="Doctor" />
        </div>
      </div>
      <div className="doctorsList">
        <h2>Doctors List</h2>
        <div className="doctorCard">
          <div className="doctorInfo">
            <h3>Dr. John Doe</h3>
            <p>Cardiologist</p>
            <p>Experience: 10 years</p>
          </div>
          <button className="viewProfile">View Profile</button>
        </div>
        <div className="doctorCard">
          <div className="doctorInfo">
            <h3>Dr. Jane Smith</h3>
            <p>Neurologist</p>
            <p>Experience: 8 years</p>
          </div>
          <button className="viewProfile">View Profile</button>
        </div>
        <div className="doctorCard">
          <div className="doctorInfo">
            <h3>Dr. Emily Johnson</h3>
            <p>Dermatologist</p>
            <p>Experience: 5 years</p>
          </div>
          <button className="viewProfile">View Profile</button>
      </div>
        <div className="doctorCard">
          <div className="doctorInfo">
            <h3>Dr. Michael Brown</h3>
            <p>Pediatrician</p>
            <p>Experience: 7 years</p>
          </div>
          <button className="viewProfile">View Profile</button>
        </div>
        <div className="doctorCard">
          <div className="doctorInfo">
            <h3>Dr. Sarah Wilson</h3>
            <p>Orthopedic Surgeon</p>
            <p>Experience: 12 years</p>
          </div>
          <button className="viewProfile">View Profile</button>
        </div>
    </div>
    </div>
  )
}

export default DoctorPage
