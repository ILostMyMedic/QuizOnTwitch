// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import themeReducer from './store/themeSlice';
// import App from './App';

// const mockStore = configureStore({ reducer: { theme: themeReducer } });

// test('should toggle theme on button click', () => {
//     render(
//         <Provider store={mockStore}>
//             <App />
//         </Provider>
//     );

//     const button = screen.getByText('Toggle Theme');
//     userEvent.click(button);

//     // Assert that the store state reflects the change (requires checking the store instance)
//     expect(mockStore.getState().theme).toBe('dark'); // Adjust assertion based on your test logic
// });
