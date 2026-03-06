import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove, update } from "firebase/database";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  FaDownload, 
  FaFileExcel, 
  FaFilePdf, 
  FaTrash, 
  FaFilter,
  FaSort,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';
import "./ManageQuote.css";

const ManageQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  useEffect(() => {
    const quotesRef = ref(db, "quotes");

    onValue(quotesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
          createdAt: value.createdAt ? new Date(value.createdAt).toLocaleString() : 'N/A'
        }));
        setQuotes(formatted);
        setFilteredQuotes(formatted);
      } else {
        setQuotes([]);
        setFilteredQuotes([]);
      }
      setLoading(false);
    });
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...quotes];

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(q => q.status === filters.status);
    }

    // Apply service filter
    if (filters.service !== 'all') {
      result = result.filter(q => q.service === filters.service);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(q => 
        q.name?.toLowerCase().includes(searchLower) ||
        q.email?.toLowerCase().includes(searchLower) ||
        q.phone?.includes(filters.search) ||
        q.message?.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'createdAt') {
        aVal = new Date(aVal) || 0;
        bVal = new Date(bVal) || 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredQuotes(result);
  }, [quotes, filters, sortConfig]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quote?");
    if (!confirmDelete) return;

    try {
      await remove(ref(db, `quotes/${id}`));
    } catch (error) {
      alert("Error deleting quote: " + error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await update(ref(db, `quotes/${id}`), {
        status: newStatus,
      });
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return <span className="status-badge pending"><FaClock /> Pending</span>;
      case 'Contacted':
        return <span className="status-badge contacted"><FaCheckCircle /> Contacted</span>;
      case 'Closed':
        return <span className="status-badge closed"><FaTimesCircle /> Closed</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredQuotes.map(q => ({
      'Name': q.name,
      'Phone': q.phone,
      'Email': q.email,
      'Service': q.service,
      'Message': q.message,
      'Status': q.status,
      'Submitted Via': q.submittedVia,
      'Date': q.createdAt
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotes");
    XLSX.writeFile(wb, `quotes_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Quote Management Report', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);
    doc.text(`Total Quotes: ${filteredQuotes.length}`, 14, 38);

    const tableColumn = ["Name", "Phone", "Email", "Service", "Status", "Via", "Date"];
    const tableRows = [];

    filteredQuotes.forEach(quote => {
      const quoteData = [
        quote.name || 'N/A',
        quote.phone || 'N/A',
        quote.email || 'N/A',
        quote.service || 'N/A',
        quote.status || 'N/A',
        quote.submittedVia || 'N/A',
        quote.createdAt || 'N/A'
      ];
      tableRows.push(quoteData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [44, 101, 186], textColor: 255 }
    });

    doc.save(`quotes_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const uniqueServices = [...new Set(quotes.map(q => q.service).filter(Boolean))];

  return (
    <div className="manage-quote-page">
      <div className="mq-header">
        <div className="mq-header-left">
          <h1>Manage Quotes</h1>
          <p className="mq-total-count">Total: {filteredQuotes.length} quotes</p>
        </div>
        
        <div className="mq-export-buttons">
          <button className="mq-export-btn excel" onClick={exportToExcel}>
            <FaFileExcel /> Export Excel
          </button>
          <button className="mq-export-btn pdf" onClick={exportToPDF}>
            <FaFilePdf /> Export PDF
          </button>
        </div>
      </div>

      <div className="mq-filters-section">
        <div className="mq-search-box">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="mq-search-input"
          />
        </div>

        <div className="mq-filter-controls">
          <div className="mq-filter-group">
            <label><FaFilter /> Status:</label>
            <select 
              value={filters.status} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="mq-filter-select"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="mq-filter-group">
            <label><FaFilter /> Service:</label>
            <select 
              value={filters.service} 
              onChange={(e) => setFilters({...filters, service: e.target.value})}
              className="mq-filter-select"
            >
              <option value="all">All Services</option>
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mq-loading">Loading quotes...</div>
      ) : filteredQuotes.length === 0 ? (
        <div className="mq-empty-state">
          <p>No quotes found.</p>
        </div>
      ) : (
        <div className="mq-table-container">
          <table className="mq-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>
                  Name <FaSort />
                </th>
                <th>Phone</th>
                <th onClick={() => handleSort('email')}>
                  Email <FaSort />
                </th>
                <th>Service</th>
                <th>Message</th>
                <th onClick={() => handleSort('status')}>
                  Status <FaSort />
                </th>
                <th>Submitted Via</th>
                <th onClick={() => handleSort('createdAt')}>
                  Date <FaSort />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td><strong>{quote.name || 'N/A'}</strong></td>
                  <td>{quote.phone || 'N/A'}</td>
                  <td>{quote.email || 'N/A'}</td>
                  <td>
                    <span className="service-tag">{quote.service || 'N/A'}</span>
                  </td>
                  <td className="message-cell" title={quote.message}>
                    {quote.message?.length > 50 
                      ? quote.message.substring(0, 50) + '...' 
                      : quote.message || 'N/A'}
                  </td>
                  <td>
                    <select
                      className={`status-select status-${(quote.status || 'pending').toLowerCase()}`}
                      value={quote.status || 'Pending'}
                      onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                    {getStatusBadge(quote.status)}
                  </td>
                  <td>
                    <span className="via-badge">{quote.submittedVia || 'N/A'}</span>
                  </td>
                  <td>{quote.createdAt}</td>
                  <td>
                    <button
                      className="mq-delete-btn"
                      onClick={() => handleDelete(quote.id)}
                      title="Delete Quote"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageQuote;