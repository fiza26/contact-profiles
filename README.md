<img width="1919" height="889" alt="contact app 1" src="https://github.com/user-attachments/assets/ca3e5d3d-7042-4e14-af85-66ef5f9d8603" />
<img width="1919" height="889" alt="contact app 2" src="https://github.com/user-attachments/assets/ce331d95-0c8c-4fa6-845a-2378c93aca33" />
<img width="1919" height="891" alt="contact app 3" src="https://github.com/user-attachments/assets/aa8e57cd-942c-444b-9ace-ad89693f66f4" />
<img width="1919" height="888" alt="contact app 4" src="https://github.com/user-attachments/assets/d2cf99dc-819b-4279-893d-07288107302f" />
<img width="1919" height="887" alt="contact 5" src="https://github.com/user-attachments/assets/10f4ee03-3084-4cd5-a4f2-24997f704919" />

## Contact Profiles
A simple Contact Profiles application built with Quasar Framework (Vue 3) frontend and Node.js + Express backend with MySQL database.
The app allows you to add, edit, update, view, and delete contacts.

## Features
- Create, read, update, delete (CRUD) contacts
- Responsive UI built with Quasar Framework
- Backend REST API with Node.js, Express.js and MySQL

## Prerequisites
- Node.js
- MySQL database
- npm

## Setup Instructions
### 1. Clone the repository
```
git clone https://github.com/fiza26/contact-profiles
cd contact-profiles
```

### 2. Backend Setup
#### Configure MySQL Database
- Create a database

```
CREATE DATABASE contacts_db;
USE contacts_db;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT
);
```

- Create a .env file inside your backend folder with your DB credentials:

```
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=contacts_db
```

#### Install backend dependencies
```
cd backend
npm install
```

#### Start backend server
```
npm run dev
```

#### Server will run on: https://localhost:3000

### 3. Frontend Setup
#### Install dependencies
```
cd frontend
npm install
```

#### Run the frontend dev server
```
npx quasar dev
```

### 4. Usage
- Use the UI to add, edit, and delete contacts
- All data is saved in your MySQL database via backend REST API

### 5. Notes
- Make sure the backend server is running before using the frontend app
- If you change backend API port or host, update the API URL in your frontend service file (src/services/contactService.js)
- This app uses Quasar Framework's q-table, q-dialog, and q-input components for UI



