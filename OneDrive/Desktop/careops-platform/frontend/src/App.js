import React, { useState, useEffect } from "react";
import "./App.css";
import API_URL from "./config";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "" });

  useEffect(() => {
    checkBackend();
    fetchPatients();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setApiStatus(data.message);
    } catch (err) {
      setApiStatus("❌ Backend not connected");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_URL}/api/patients`);
      const data = await res.json();
      setPatients(data.patients);
    } catch (err) {
      console.log("Error fetching patients");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([...patients, { ...newPatient, id: Date.now() }]);
    setNewPatient({ name: "", age: "", condition: "" });
  };

  return (
    <div className="App">
      <h1>🏥 CareOps Platform</h1>
      <p>Backend: {apiStatus}</p>
      
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
          required
        /><br/>
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
          required
        /><br/>
        <input
          placeholder="Condition"
          value={newPatient.condition}
          onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
          required
        /><br/>
        <button type="submit">Add</button>
      </form>

      <h2>Patients ({patients.length})</h2>
      {patients.length === 0 ? (
        <p>No patients</p>
      ) : (
        <ul>
          {patients.map((p) => (
            <li key={p.id}>{p.name} - Age: {p.age}, {p.condition}</li>
          ))}
        </ul>
      )}
      
      <button onClick={() => window.open("http://localhost:5000")}>
        Test API
      </button>
    </div>
  );
}

export default App;
