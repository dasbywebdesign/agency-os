import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return React.createElement('div', 
    {style: {padding: 40, fontFamily: 'Arial'}},
    React.createElement('h1', {style: {color: '#0D1B3E'}}, '⚡ Creator Agency OS'),
    React.createElement('p', null, 'App is loading correctly. Full app coming next.')
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
