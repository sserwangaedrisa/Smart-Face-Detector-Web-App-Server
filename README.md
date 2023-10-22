# Smart Face Detector Web App Server

Welcome to the Smart Face Detector Web App server repository. This server is built with Node.js, utilizing Knex.js for PostgreSQL integration and bcrypt for secure password storage. It also interfaces with the Clarifai API for face detection.

## Setup

1. **Clone the Repository**: Start by cloning this repository to your local machine.

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using the following command:

> npm install

3. **Database Configuration**:

- Set up a PostgreSQL database and configure the connection settings in `knexfile.js`.
- Update the database details in the configuration file as needed.

4. **Run the Server**:
   Start the server by running:
   > npm start

The server will start running on the specified port (default is 3000).

## API Endpoints

- **POST `/signin`**: User authentication and sign-in.
- **POST `/signup`**: User signing up.
- **PUT `/image`**: Update user image entry count.
- **POST `/imageurl`**: Detect faces in an image by URL.

## Usage

Make sure you have the frontend React application set up and running to interact effectively with this server. The server uses the Clarifai API for face detection and manages user authentication and data updates.

## Contributing

We welcome and appreciate contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. **Fork this Repository**: Click the "Fork" button at the top right of this page to create your own copy of this repository.

2. **Clone your Fork**: Clone your forked repository to your local machine using `git clone` and the repository URL.
   Then replace `<your-username>` with your GitHub username and `<repository>` with the repository name:

   ```bash
   git clone https://github.com/<your-username>/<repository>.git
   ```

## License

This project is licensed under the [MIT License](LICENSE).
