# Floating Books App

## Project Brief

This is frontend application for backend Floating-Books-Api.

User can register in this app and donate books.

Another user can register in this app, search book, add to favourites, then order books.

Book owner can accept or reject any book order.

If book owner accept book order, app will track with status and send email notification.

## Screenshots of app

- screenshots user registration

  <img src="screenshots\start-screen.jpeg" height="200">
  <img src="screenshots\0101-add-user-1.jpeg" height="200">
  <img src="screenshots\0102-add-user-2.jpeg" height="200">
  <img src="screenshots\0103-add-user-3.jpeg" height="200">

- screenshots user must verify email and then login

  <img src="screenshots\0201-first-time-login.jpeg" height="200">
  <img src="screenshots\0202-email-to-verify.jpeg" height="200">
  <img src="screenshots\0203-login-success-home-page.jpeg" height="200">

- screenshots home page menu

  <img src="screenshots\0301-left-menu.jpeg" height="200">
  <img src="screenshots\0302-right-menu.jpeg" height="200">

- screenshots user donates book

  <img src="screenshots\0401-add-book-page.jpeg" height="200">
  <img src="screenshots\0402-after-add-book-1.jpeg" height="200">
  <img src="screenshots\0403-after-add-book-2.jpeg" height="200">

- screenshots another user login, search book, order book

  <img src="screenshots\0501-another-user-login.jpeg" height="200">
  <img src="screenshots\0502-search-book.jpeg" height="200">
  <img src="screenshots\0503-order-book.jpeg" height="200">
  <img src="screenshots\0504-requestor-dashboard.jpeg" height="200">

- screenshots owner received email notification, then accept, then receive requester's address

  <img src="screenshots\0601-owner-receive-email.jpeg" height="200">
  <img src="screenshots\0602-owner-dashboard.jpeg" height="200">
  <img src="screenshots\0604-owner-receive-requester-address.jpeg" height="200">

- requester received email notification, order is accepted

  <img src="screenshots\0605-requester-be-informed.jpeg" height="200">

- screenshots owner delivered book and update status

  <img src="screenshots\0606-owner-confirm-delivered-1.jpeg" height="200">
  <img src="screenshots\0607-owner-confirm-delivered-2.jpeg" height="200">

- requester received email notification, book is delivered

  <img src="screenshots\0703-email-inform-requester.jpeg" height="200">

- screenshots requester received book and update status

  <img src="screenshots\0701-requester-confirm-receive-1.jpeg" height="200">
  <img src="screenshots\0702-requester-dashboard-history.jpeg" height="200">

- screenshots dashboard of owner no more follow up task and book owner is updated

  <img src="screenshots\0704-owner-dashboard-empty.jpeg" height="200">
  <img src="screenshots\0801-current-book-owner-updated.jpeg" height="200">

## Testing utilities used (Jest, React Testing Library)

| Utilities     | From                     | Usage                                                                   |
| ------------- | ------------------------ | ----------------------------------------------------------------------- |
| renderer      | "react-test-renderer"    | to generate component snapshots to catch unanticipated changes          |
| render        | "@testing-library/react" | to create the virtual test environment                                  |
| fireEvent     | "@testing-library/react" | to simulate event trigger on component                                  |
| BrowserRouter | "react-router-dom"       | to store current location in the browser's address bar using clean URLs |
| MemoryRouter  | "react-router-dom"       | to store locations internally in an array                               |

## Technologies

- [React](https://react.dev/learn): create a React app project template
- [MUI](https://mui.com/): offers a comprehensive suite of UI tools to help you ship new features faster
- [useLocation,useNavigate](https://reactrouter.com/en/v6.3.0/api): React router function
- [Axios API](https://axios-http.com/docs/intro): promise-based HTTP Client for node.js and the browser
- [Firebase authentication](https://firebase.google.com/docs/auth): a drop-in auth solution that handles the UI flows for signing in users with email addresses and passwords

## Instructions

- Clone frontend repo floating-books:

  ```
  git clone https://github.com/SomiaHussain/floating-books.git
  ```

- Move into the directory and install:

  ```
  cd floating-books
  npm install
  ```

- To start and run on port 3000:

  ```
  npm start
  ```

- To run the tests:

  ```
  npm test
  ```

## Problem and solution

- React-Testing library not rendering Material-UI Dialog in snapshot
- getting error warning in MUI TextField component with select

## Author

[Somia Hussain](https://www.linkedin.com/in/somia-hussain-b3498426a/)

[David Cheung](https://www.linkedin.com/in/david-cheung-473597199/)
