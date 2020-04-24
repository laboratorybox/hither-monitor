import React from 'react';
import logo from './logo.svg';
import './App.css';
import EditableTable from './EditableTable';

function ComputeResourcesView(props) {
  const [computeResourcesConfig, setComputeResourcesConfig] = useLocalStorage('hither-compute-resources-config', {});
  const setComputeResources = cr => {
    let a = computeResourcesConfig;
    a.computeResources = cr;
    setComputeResourcesConfig(a);
  }
  const columns = [
    {
      key: 'name'
    }
  ];
  let computeResources = computeResourcesConfig.computeResources || [];
  return (
    <EditableTable
      data={computeResources}
      setData={setComputeResources}
      columns={columns}
    />
  );
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  return (
    <div className="App">
      <h2>Hither manager</h2>
      <ComputeResourcesView />
    </div>
  );
}

export default App;
