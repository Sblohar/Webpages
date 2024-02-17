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

  const formatLineData = (lineData) => {
    return JSON.stringify(lineData, null, 2);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate); 
  };
  
  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
      setEndDate(selectedDate); 
  };


  const filteredOrders = orderList.filter(order =>
    order.order_name.toLowerCase().includes(search.toLowerCase()) &&
    (status === '' || order.status === status)
  );

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const buttonShowLog = (logData) => {
    const popupWindow = window.open('', '_blank', 'width=600,height=400');
    popupWindow.document.write(logData);
  };

  const tableHeader = React.createElement('tr', { style: { borderBottom: '1px solid black', borderTop: '1px solid black', marginTop: '20px' } },
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'ID')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Order names')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Weight')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Length')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Width')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Height')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Status')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Date')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Picking')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Message')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Main operation type')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Status Updated To Odoo')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Odoo Response Message')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Cron')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Log')),
    React.createElement('th', { scope: 'col', style: { padding: '10px' } }, React.createElement('h3', null, 'Line json data')),
    
  );

    const tableRows = [];
    for (let index = 0; index < filteredOrders.length; index++) {
      const order = filteredOrders[index];
      const orderDate = new Date(order.create_date);
      
      console.log(orderDate);
      
      if ((!startDate || orderDate >=  new Date(startDate)) &&
          (!endDate || orderDate <= new Date(endDate))) {
        tableRows.push(
          React.createElement('tr', { key: index, style: { borderBottom: '1px solid black', display: 'table-row' } },
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.ID),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.order_name),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.weight),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.length),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.width),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.height),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.status),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.create_date),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.picking),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.msg),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.main_operation_type),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.status_updated_to_odoo),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.odoo_response_message),
            React.createElement('td', { style: { padding: '10px', fontSize: '18px' } }, order.cron),
            React.createElement('td', { style: { padding: '30px' } },
            React.createElement('button', { onClick: () => buttonShowLog(order.log), style: { marginLeft: '10px', padding: '10px', width: '100px', backgroundColor: 'blue', color: 'white', fontSize: '20px', borderRadius: '15px', borderColor: 'blue' } }, 'View Log'),
            ),            
            React.createElement('td', { style: { padding: '30px' } },
              React.createElement('button', { onClick: () => buttonShowData(index), style: { padding: '10px', width: '100px', backgroundColor: 'red', color: 'white', fontSize: '20px', borderRadius: '15px', borderColor: 'red' } }, 'View Data')
            )
          )
        );
      } else {
        tableRows.push(
          React.createElement('tr', { key: index, style: { display: 'none' } })
        );
      }
    }

    return React.createElement('div', { style: { margin: '10px', padding: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 1)', padding: '20px', marginBottom: '5px', backgroundColor: 'white', borderRadius: '3px', width: '98%', overflowX: 'auto' } },
      React.createElement('h2', null, 'Order List Table'),
      React.createElement('input', { type: 'text', placeholder: 'Search by order name', value: search, onChange: searchChange, style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px', width: '30%' } }),
      React.createElement('div', { style: { display: 'flex' } },
      React.createElement('input', { type: 'datetime-local', placeholder: 'Start Date', value: startDate, onChange: handleStartDateChange, style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '30px', width: '250px', marginLeft: '15px' } }),
      React.createElement('p', { style: { marginLeft: '15px', marginRight: '15px' } }, 'To'),
      React.createElement('input', { type: 'datetime-local', placeholder: 'End Date', value: endDate, onChange: handleEndDateChange, style: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '30px', width: '250px' } })
      ),
      React.createElement('div', { style: { marginBottom: '10px', marginLeft: '15px' } },
      'Status: ',
      React.createElement('select', { value: status, onChange: handleStatusChange },
          React.createElement('option', { value: ''  }, 'Select Status'),
          React.createElement('option', { value: 'completed' }, 'Completed'),
          React.createElement('option', { value: 'failed' }, 'Failed')
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

      return React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 } },
        React.createElement('div', {
          style: { width: '30%',height: '30%', position: 'absolute',top: '50%',left: '80%',transform: 'translate(-50%, -50%)',backgroundColor: 'white',padding: '20px',borderRadius: '5px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',overflowY: 'scroll'}
        },
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement('button', {
              onClick: onClose,
              style: { position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }
            }, '✕')),
          React.createElement('pre', { style: { maxHeight: '100%', overflowY: 'auto' } }, formatLineData(data.line_json_data))
        )
      );
    };
