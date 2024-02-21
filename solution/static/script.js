const MyReactComponent = ({ orderList }) => {
  const [search, setSearch] = React.useState('');
  const [visibleRow, setVisibleRow] = React.useState(null);
  const [popupData, setPopupData] = React.useState(null);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('');
   
  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  const buttonShowData = (index) => {
    setVisibleRow(visibleRow === index ? null : index);
    setPopupData(visibleRow === index ? null : orderList[index]);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    setEndDate(selectedDate);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const filteredOrders = orderList.filter(order =>
    order.order_name.toLowerCase().includes(search.toLowerCase()) &&
    (status === '' || order.status === status)
  );
  
  const uniqueStatuses = Array.from(new Set(orderList.map(order => order.status)));

  const statusOptions = uniqueStatuses.map((status, index) => (
    React.createElement('option', { key: index, value: status }, status.charAt(0).toUpperCase() + status.slice(1))
  ));

  const buttonShowLog = (logData) => {
    const width = 700;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    popupWindow.document.write(logData);
  };

  const tableHeader = React.createElement('tr', {
    style: { borderBottom: '1px solid black', borderTop: '1px solid black', marginTop: '20px' }
  },
    Object.keys(orderList[0]).map((key, index) => {
      if (key.includes('Celery Error') || index === 1 || index === 4) return null;

      const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      

      return React.createElement('th', { key: index, scope: 'col', style: { padding: '10px' } },
        React.createElement('h3', null, formattedKey)
      );
    })
  );

  const tableRows = filteredOrders.map((order, index) => {
    const orderDate = new Date(order.create_date);
    if (
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate))
    ) {
      return (
        React.createElement('tr', { key: index, style: { borderBottom: '1px solid black', display: 'table-row', textAlign: 'center' } },
          Object.keys(order).map((key, innerIndex) => {
            if (innerIndex === 1 || innerIndex === 4) return null;

            if (key === 'line_json_data') {
              return React.createElement('td', { key: innerIndex, style: { padding: '10px' } },
                React.createElement('button', {
                  onClick: () => buttonShowData(index),
                  style: { padding: '10px', width: '100px', backgroundColor: 'red', color: 'white', fontSize: '20px', borderRadius: '15px', borderColor: 'red' }
                }, 'View Data')
              );
            } if (key === 'log') {
              return React.createElement('td', { key: innerIndex, style: { padding: '10px' } },
                React.createElement('button', {
                  onClick: () => buttonShowLog(order.log),
                  style: { padding: '10px', width: '100px', backgroundColor: 'blue', color: 'white', fontSize: '20px', borderRadius: '15px', borderColor: 'blue' }
                }, 'View Log')
              );
            } else {
              return React.createElement('td', { key: innerIndex, style: { padding: '10px', fontSize: '18px' } }, order[key]);
            }
          })
        )
      );
    } else {
      return React.createElement('tr', { key: index, style: { display: 'none' } });
    }
  });

  return React.createElement('div', {
    style: { margin: '10px', padding: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 1)', padding: '20px', marginBottom: '5px', backgroundColor: 'white', borderRadius: '3px', width: '98%', overflowX: 'auto' }
  },
    React.createElement('h2', null, 'Order List Table'),
    React.createElement('input', {
      type: 'text', placeholder: 'Search by order name', value: search, onChange: searchChange,
      style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px', width: '30%' }
    }),
    React.createElement('div', { style: { display: 'flex' } },
      React.createElement('input', {
        type: 'datetime-local', placeholder: 'Start Date', value: startDate, onChange: handleStartDateChange,
        style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '30px', width: '250px', marginLeft: '15px' }
      }),
      React.createElement('p', { style: { marginLeft: '15px', marginRight: '15px' } }, 'To'),
      React.createElement('input', {
        type: 'datetime-local', placeholder: 'End Date', value: endDate, onChange: handleEndDateChange,
        style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '30px', width: '250px' }
      })
    ),
    React.createElement('div', { style: { marginBottom: '10px', marginLeft: '15px' } },
    'Status: ',
    React.createElement('select', { value: status, onChange: handleStatusChange },
      React.createElement('option', { value: '' }, 'Select Status'),
      statusOptions 
    )
  ),
    React.createElement('table', { className: 'table', style: { width: '100%', borderCollapse: 'collapse', padding: '10px' } },
      React.createElement('thead', null, tableHeader),
      React.createElement('tbody', null, tableRows)
    ),
    popupData && React.createElement(Popup, { data: popupData, onClose: () => setPopupData(null) })
  );
};

const Popup = ({ data, onClose }) => {
  const formatLineData = (lineData) => {
    return JSON.stringify(lineData, null, 2);
  };

  return React.createElement('div', {
    style: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1
    }
  },
    React.createElement('div', {
      style: {
        width: '30%', height: '30%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflowY: 'scroll'
      }
    },
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('button', {
          onClick: onClose,
          style: { position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }
        }, '✕')
      ),
      React.createElement('pre', { style: { maxHeight: '100%', overflowY: 'auto' } }, formatLineData(data.line_json_data))
    )
  );
};
