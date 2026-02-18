import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove, update } from "firebase/database";

const ManageQuote = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const quotesRef = ref(db, "quotes");

    onValue(quotesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setQuotes(formatted.reverse());
      } else {
        setQuotes([]);
      }
    });
  }, []);

  // 🔹 DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quote?");
    if (!confirmDelete) return;

    await remove(ref(db, `quotes/${id}`));
  };

  // 🔹 UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    await update(ref(db, `quotes/${id}`), {
      status: newStatus,
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Quotes</h2>

      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Message</th>
              <th>Status</th>
              <th>Submitted Via</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td>{quote.name}</td>
                <td>{quote.phone}</td>
                <td>{quote.email}</td>
                <td>{quote.service}</td>
                <td>{quote.message}</td>

                <td>
                  <select
                    value={quote.status}
                    onChange={(e) =>
                      handleStatusChange(quote.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>

                <td>{quote.submittedVia}</td>

                <td>
                  <button
                    style={{ background: "red", color: "white", padding: "6px 10px", border: "none" }}
                    onClick={() => handleDelete(quote.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageQuote;