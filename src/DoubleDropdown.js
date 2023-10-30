import React, { useState } from 'react';

const DoubleDropdown = ({ handleGroupingClick }) => {
  const [displayDropdownVisible, setDisplayDropdownVisible] = useState(false);
  const [groupingDropdownVisible, setGroupingDropdownVisible] = useState(false);
  const [orderingDropdownVisible, setOrderingDropdownVisible] = useState(false);

  const toggleDisplayDropdown = () => {
    setDisplayDropdownVisible(!displayDropdownVisible);
  };

  const toggleGroupingDropdown = () => {
    setGroupingDropdownVisible(!groupingDropdownVisible);
  };

  const toggleOrderingDropdown = () => {
    setOrderingDropdownVisible(!orderingDropdownVisible);
  };

  return (
    <div className="double-dropdown">
      <div className="dropdown">
        <button onClick={toggleDisplayDropdown}>Display 🢓</button>
        {displayDropdownVisible && (
          <div className="sub-dropdown">
            <div className="dropdown">
              <button onClick={toggleGroupingDropdown}>Grouping   🢓</button>
              {groupingDropdownVisible && (
                <div className="sub-dropdown">
                  <button onClick={() => { handleGroupingClick("Status"); }}>Status</button>
                  <button onClick={() => { handleGroupingClick("User"); }}>User</button>
                  <button onClick={() => { handleGroupingClick("Priority"); }}>Priority</button>
                </div>
              )}
            </div>
            <div className="dropdown">
              <button onClick={toggleOrderingDropdown}>Ordering 🢓</button>
              {orderingDropdownVisible && (
                <div className="sub-dropdown">
                  <button>Priority</button>
                  <button>Title</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubleDropdown;
