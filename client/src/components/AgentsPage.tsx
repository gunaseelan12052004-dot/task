import React, { useEffect, useState } from 'react';
import './AgentsPage.css';

interface Agent {
  agent_id: number;
  agent_name: string;
  company_name: string;
  email: string;
  phone: string;
  properties_count: number;
  inspections_count: number;
  join_date: string;
  is_active: number; // 1 or 0
  created_at: string;
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/agents');
      const data = await response.json();
      if (data.success) {
        setAgents(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch agents. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agent?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/agents/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setAgents(agents.filter(agent => agent.agent_id !== id));
      } else {
        alert(data.message || 'Failed to delete agent');
      }
    } catch (err) {
      alert('Error connecting to Server to delete');
    }
  };

  // Filter Logic
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' 
                          || (statusFilter === 'Active' && agent.is_active === 1)
                          || (statusFilter === 'Inactive' && agent.is_active === 0);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="agents-page-container">
      
      {/* Top Toolbar */}
      <div className="agents-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <i className="bi bi-search search-icon"></i>
            <input 
              type="text" 
              placeholder="Search agents" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-field" 
            />
          </div>
        </div>

        <div className="toolbar-right">
          <div className="status-dropdown">
            <select 
              className="status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className="btn-primary-add">
            <i className="bi bi-plus"></i> Add Agents
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Data Table */}
      <div className="table-responsive bg-white rounded-3 shadow-sm border-0">
        <table className="table agent-table align-middle mb-0">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Properties</th>
              <th>Inspections</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-4">Loading agents...</td></tr>
            ) : filteredAgents.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-4 text-muted">No agents found</td></tr>
            ) : (
              filteredAgents.map(agent => (
                <tr key={agent.agent_id}>
                  <td className="fw-medium text-dark">{agent.agent_name}</td>
                  <td className="text-muted">{agent.company_name}</td>
                  <td className="text-muted">{agent.email}</td>
                  <td className="text-muted">{agent.phone}</td>
                  <td className="text-center text-muted fw-medium">{agent.properties_count}</td>
                  <td className="text-center text-muted fw-medium">{agent.inspections_count}</td>
                  <td>
                    {agent.is_active === 1 ? (
                      <span className="badge-status badge-active">Active</span>
                    ) : (
                      <span className="badge-status badge-inactive">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action view" title="View"><i className="bi bi-eye"></i></button>
                      <button className="btn-action edit" title="Edit"><i className="bi bi-pencil-square"></i></button>
                      <button className="btn-action delete" title="Delete" onClick={() => handleDelete(agent.agent_id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pagination-footer mt-4">
        <span className="pagination-info">1 of 100 rows selected</span>
        <div className="pagination-controls">
          <button className="btn-page text-muted"><i className="bi bi-chevron-left me-1"></i> Previous</button>
          <div className="page-numbers">
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <span className="page-dots">...</span>
            <button className="page-num">100</button>
          </div>
          <button className="btn-page text-muted">Next <i className="bi bi-chevron-right ms-1"></i></button>
        </div>
      </div>

    </div>
  );
};

export default AgentsPage;
