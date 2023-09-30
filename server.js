const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const serverless = require("serverless-http");

const router = express.Router();

const app = express();
app.use(bodyParser.json());

app.use(cors(corsOptions))

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Lakshmi Venkata',
    specialty: 'Ophthalmology',
    maxPatientsPerEvening: 10,
    availability: {
      Monday: '7:30 PM - 11:30 PM',
      Tuesday: '7:30 PM - 11:30 PM',
      Wednesday: '7:30 PM - 11:30 PM',
      Thursday: '7:30 PM - 11:30 PM',
      Friday: '7:30 PM - 11:30 PM',
    },
  },
  {
    id: 2,
    name: 'Dr. Neha Singh',
    specialty: 'Neurologist',
    maxPatientsPerEvening: 11,
    availability: {
      Monday: '7:00 PM - 11:00 PM',
      Wednesday: '7:00 PM - 11:00 PM',
      Thursday: '7:00 PM - 11:00 PM',
    },
  },

  {
    id: 3,
    name: 'Dr. Suraj Kumar',
    specialty: 'Surgeon',
    maxPatientsPerEvening: 5,
    availability: {
      Monday: '7:00 PM - 11:30 PM',
      Wednesday: '11:30 PM - 11:00 PM',
      Friday: '11:00 PM - 10:00 PM',
    },
  },
];

// Sample data for appointments
const appointments = [];

// Endpoint to get a list of all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Endpoint to get detailed information about a specific doctor
app.get('/api/doctors/:doctorId', (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

// Endpoint to get a list of all appoinmentBooked
app.get('/api/bookedAppoinment', (req, res) => {
    res.json(appointments);
  });

// Endpoint to book an appointment
app.post('/api/appointments', (req, res) => {
  const { doctorId, appointmentTime } = req.body;

  // Check if the doctor exists
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  // Check if the appointment time is valid
  if (
    !doctor.availability[appointmentTime] ||
    appointments.filter((apt) => apt.doctorId === doctorId).length >=
      doctor.maxPatientsPerEvening
  ) {
    return res.status(400).json({ error: 'Appointment not available' });
  }

  // Book the appointment
  appointments.push({
    doctorId,
    doctorName: doctor.name,
    appointmentTime,
  });

  res.status(201).json({ message: 'Appointment booked successfully' });
});

app.use(`/.netlify/functions/api`, router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);