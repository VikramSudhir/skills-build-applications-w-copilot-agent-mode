import React, { useEffect, useState } from 'react';


const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalWorkout, setModalWorkout] = useState(null);
  const [form, setForm] = useState({ name: '', duration: '', calories: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setWorkouts(items);
        console.log('Fetched workouts:', items);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate POST (replace with real API call)
    const newWorkout = { ...form, id: Date.now() };
    setWorkouts([newWorkout, ...workouts]);
    setForm({ name: '', duration: '', calories: '' });
  };

  const openModal = (workout) => {
    setModalWorkout(workout);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalWorkout(null);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-danger">Workouts</h2>
        <form className="row g-3 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input type="text" className="form-control form-control-lg rounded-pill" name="name" placeholder="Workout Name" value={form.name} onChange={handleInputChange} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control form-control-lg rounded-pill" name="duration" placeholder="Duration (min)" value={form.duration} onChange={handleInputChange} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control form-control-lg rounded-pill" name="calories" placeholder="Calories Burned" value={form.calories} onChange={handleInputChange} required />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-primary btn-lg rounded-pill">Add Workout</button>
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                {workouts[0] && Object.keys(workouts[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  {Object.values(workout).map((val, i) => (
                    <td key={i}>{val !== null ? val.toString() : ''}</td>
                  ))}
                  <td>
                    <button className="btn btn-outline-info btn-sm rounded-pill" onClick={() => openModal(workout)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && modalWorkout && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content rounded-4">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Workout Details</h5>
                  <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {Object.entries(modalWorkout).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
