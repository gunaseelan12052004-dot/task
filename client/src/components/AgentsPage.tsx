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
  status: 'Active' | 'Inactive' | 'Suspended';
}

interface AgentForm {
  agent_name: string;
  company_name: string;
  email: string;
  phone: string;
  properties_count: string;
  inspections_count: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

const DEMO_AGENTS: Agent[] = [
  { agent_id: 1, agent_name: 'Michael', company_name: 'Bluenest reality', email: 'michael@bluen...', phone: '+44 7911 234567', properties_count: 18, inspections_count: 42, status: 'Active' },
  { agent_id: 2, agent_name: 'Olivia haris', company_name: 'Urbankey estates', email: 'olivia@urbanke...', phone: '+44 8911 234567', properties_count: 2, inspections_count: 10, status: 'Active' },
  { agent_id: 3, agent_name: 'Daniel', company_name: 'Bluenest reality', email: 'daniel@primele...', phone: '+44 7822 456789', properties_count: 18, inspections_count: 20, status: 'Inactive' },
  { agent_id: 4, agent_name: 'Wilson', company_name: 'City homes', email: 'wilson@cityhom...', phone: '+44 7822 456879', properties_count: 10, inspections_count: 10, status: 'Active' },
  { agent_id: 5, agent_name: 'Sophie', company_name: 'City homes', email: 'sophie@cityho...', phone: '+44 7700 112233', properties_count: 12, inspections_count: 10, status: 'Suspended' },
  { agent_id: 6, agent_name: 'Turner bruno', company_name: 'Primelet agents', email: 'turnes@horizon...', phone: '+44 7555 998877', properties_count: 20, inspections_count: 20, status: 'Active' },
  { agent_id: 7, agent_name: 'Bucky', company_name: 'Bluenest reality', email: 'michael@bluen...', phone: '+44 7911 234567', properties_count: 18, inspections_count: 42, status: 'Active' },
  { agent_id: 8, agent_name: 'William Butcher', company_name: 'Urbankey estates', email: 'olivia@urbanke...', phone: '+44 8911 234567', properties_count: 18, inspections_count: 10, status: 'Inactive' },
  { agent_id: 9, agent_name: 'John', company_name: 'Bluenest reality', email: 'daniel@primele...', phone: '+44 7822 456789', properties_count: 18, inspections_count: 20, status: 'Active' },
  { agent_id: 10, agent_name: 'Carter', company_name: 'Primelet agents', email: 'wilson@cityhom...', phone: '+44 7822 456879', properties_count: 18, inspections_count: 10, status: 'Suspended' },
  { agent_id: 11, agent_name: 'Willy', company_name: 'Urbankey estates', email: 'sophie@cityho...', phone: '+44 7700 112233', properties_count: 18, inspections_count: 10, status: 'Inactive' },
  { agent_id: 12, agent_name: 'Mike', company_name: 'Primelet agents', email: 'turnes@horizon...', phone: '+44 7555 998877', properties_count: 18, inspections_count: 20, status: 'Active' },
];

const EMPTY_FORM: AgentForm = {
  agent_name: '',
  company_name: '',
  email: '',
  phone: '',
  properties_count: '0',
  inspections_count: '0',
  status: 'Active',
};

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AgentForm>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  const rowsPerPage = 12;

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/agents');
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        const mapped = data.data.map((a: any) => ({
          ...a,
          status: a.status ? (a.status.charAt(0).toUpperCase() + a.status.slice(1)) : (a.is_active === 1 ? 'Active' : 'Inactive'),
        }));
        setAgents(mapped);
      } else {
        setAgents(DEMO_AGENTS);
      }
    } catch {
      setAgents(DEMO_AGENTS);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;
    try {
      const response = await fetch(`http://localhost:3001/api/agents/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) setAgents(prev => prev.filter(a => a.agent_id !== id));
      else alert(data.message || 'Failed to delete agent');
    } catch {
      alert('Error connecting to server');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const openEditModal = (agent: Agent) => {
    setFormData({
      agent_name: agent.agent_name,
      company_name: agent.company_name,
      email: agent.email,
      phone: agent.phone || '',
      properties_count: (agent.properties_count || 0).toString(),
      inspections_count: (agent.inspections_count || 0).toString(),
      status: agent.status,
    });
    setEditingId(agent.agent_id);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agent_name.trim() || !formData.company_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormSubmitting(true);
    setFormError('');

    try {
      const url = editingId ? `http://localhost:3001/api/agents/${editingId}` : 'http://localhost:3001/api/agents';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_name: formData.agent_name.trim(),
          company_name: formData.company_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          properties_count: parseInt(formData.properties_count) || 0,
          inspections_count: parseInt(formData.inspections_count) || 0,
          status: formData.status,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setFormSuccess(editingId ? 'Agent updated successfully!' : 'Agent added successfully!');
        await fetchAgents(); // Refresh list
        setTimeout(() => {
          setShowModal(false);
          setFormSuccess('');
          setFormData(EMPTY_FORM);
          setEditingId(null);
        }, 1200);
      } else {
        setFormError(data.message || (editingId ? 'Failed to update agent.' : 'Failed to add agent.'));
      }
    } catch {
      setFormError('Cannot connect to server. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setFormError('');
    setFormSuccess('');
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedAgents = filteredAgents.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Using a mock total pages that reflects the static design of 100
  const designTotalPages = 100;

  const getStatusBadgeClass = (status: string) => {
    if (status === 'Active') return 'badge-status badge-active';
    if (status === 'Inactive') return 'badge-status badge-inactive';
    if (status === 'Suspended') return 'badge-status badge-suspended';
    return 'badge-status';
  };

  return (
    <div className="agents-page-container">

      {/* Top Toolbar */}
      <div className="agents-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <i className="bi bi-search" style={{ color: '#94a3b8' }}></i>
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
          <div className="status-dropdown-wrapper">
            <button className="status-dropdown-btn" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
              <span>{statusFilter === 'All' ? 'Status' : statusFilter}</span>
              <i className="bi bi-chevron-down ms-2" style={{ fontSize: '0.75rem' }}></i>
            </button>
            {statusDropdownOpen && (
              <div className="status-dropdown-menu">
                {['All', 'Active', 'Inactive', 'Suspended'].map(s => (
                  <div
                    key={s}
                    className={`status-dropdown-item ${statusFilter === s ? 'selected' : ''}`}
                    onClick={() => { setStatusFilter(s); setStatusDropdownOpen(false); setCurrentPage(1); }}
                  >
                    {s === 'All' ? 'Status (All)' : s}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="btn-primary-add" onClick={handleOpenAddModal}>
            <i className="bi bi-plus-lg"></i> Add Agents
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="agents-table-wrapper">
        <table className="agents-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Properties</th>
              <th className="text-center">Inspections</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="table-empty">Loading agents...</td></tr>
            ) : paginatedAgents.length === 0 ? (
              <tr><td colSpan={8} className="table-empty">No agents found</td></tr>
            ) : (
              paginatedAgents.map(agent => (
                <tr key={agent.agent_id}>
                  <td className="agent-name-cell">{agent.agent_name}</td>
                  <td className="text-secondary-cell">{agent.company_name}</td>
                  <td className="text-secondary-cell">{agent.email}</td>
                  <td className="text-secondary-cell">{agent.phone}</td>
                  <td className="text-center text-secondary-cell">{agent.properties_count}</td>
                  <td className="text-center text-secondary-cell">{agent.inspections_count}</td>
                  <td><span className={getStatusBadgeClass(agent.status)}>{agent.status}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action view" title="View"><i className="bi bi-eye"></i></button>
                      <button className="btn-action edit" title="Edit" onClick={() => openEditModal(agent)}><i className="bi bi-pencil-square"></i></button>
                      <button className="btn-action delete" title="Delete" onClick={() => handleDelete(agent.agent_id)}>
                        <i className="bi bi-trash3"></i>
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
      <div className="pagination-footer">
        <span className="pagination-info">
          {filteredAgents.length > 0 ? `1 of ${designTotalPages} rows selected` : 'No rows'}
        </span>
        <div className="pagination-controls">
          <button className="btn-page btn-prev" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <i className="bi bi-chevron-left"></i> Previous
          </button>
          
          <div className="page-numbers">
            {/* Exactly 1, 2, 3 */}
            {[1, 2, 3].map(n => (
              <button 
                key={n} 
                className={`page-num ${currentPage === n ? 'active' : ''}`} 
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}

            {/* Exactly 4 dots mapped to pages 4, 5, 6, 7 */}
            <div className="custom-dots-wrapper">
              {[4, 5, 6, 7].map(dotPage => (
                <div 
                  key={dotPage} 
                  className={`custom-dot ${currentPage === dotPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(dotPage)}
                ></div>
              ))}
            </div>

            {/* Exactly 100 */}
            <button 
              className={`page-num ${currentPage === designTotalPages ? 'active' : ''}`} 
              onClick={() => setCurrentPage(designTotalPages)}
            >
              {designTotalPages}
            </button>
          </div>

          <button className="btn-page btn-next" onClick={() => setCurrentPage(p => Math.min(designTotalPages, p + 1))} disabled={currentPage === designTotalPages}>
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Add Agent Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header-custom">
              <div>
                <h4 className="modal-title-custom">{editingId ? 'Edit Agent Details' : 'Add New Agent'}</h4>
                <p className="modal-subtitle">{editingId ? 'Update the details of the selected agent' : 'Fill in the details to add a new agent'}</p>
              </div>
              <button className="modal-close-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveAgent} className="modal-form">
              {formError && (
                <div className="form-alert form-alert-error">
                  <i className="bi bi-exclamation-circle me-2"></i>{formError}
                </div>
              )}
              {formSuccess && (
                <div className="form-alert form-alert-success">
                  <i className="bi bi-check-circle me-2"></i>{formSuccess}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Agent Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="agent_name"
                    className="form-input"
                    placeholder="e.g. Michael"
                    value={formData.agent_name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="company_name"
                    className="form-input"
                    placeholder="e.g. Bluenest reality"
                    value={formData.company_name}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. agent@company.com"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span className="required">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    className="form-input"
                    placeholder="e.g. +44 7911 234567"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Properties Count</label>
                  <input
                    type="number"
                    name="properties_count"
                    className="form-input"
                    placeholder="0"
                    min="0"
                    value={formData.properties_count}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Inspections Count</label>
                  <input
                    type="number"
                    name="inspections_count"
                    className="form-input"
                    placeholder="0"
                    min="0"
                    value={formData.inspections_count}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select name="status" className="form-input" value={formData.status} onChange={handleFormChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="modal-footer-custom">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={formSubmitting}>
                  {formSubmitting ? (
                    <><span className="spinner"></span> {editingId ? 'Updating...' : 'Adding...'}</>
                  ) : (
                    <><i className={editingId ? "bi bi-check2-circle me-1" : "bi bi-plus-lg me-1"}></i> {editingId ? 'Update Agent' : 'Add Agent'}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgentsPage;
