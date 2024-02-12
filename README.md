# Carpool Platform

The Carpool Platform is a highly efficient web application designed to facilitate carpooling services. It employs a Selenium WebDriver-based web scraper to extract trip prices. The application is hosted locally on a Macbook server and is made accessible using Nginx. Moreover, it leverages reputable technologies and services like AWS API Gateway, FastAPI, BeautifulSoup, JSON, and much more.

## Key Features 

- A Selenium WebDriver-based web scraper developed to capture trip prices from different sources. 
- The app is locally hosted on a MacBook server which is made accessible using Nginx.
- A RESTful API constructed using AWS API Gateway and FastAPI to facilitate interaction with a Node.js lambda function hosted on AWS as the backend service. 
- Efficient email parsing in the scraper script using Beautiful Soup.
- A frontend structure architected using Next.js, React, and TypeScript (TSX) on Vercel.
- Integration of Tailwind CSS to design a visually compelling website layout.
- Use of a local script running on a uvicorn server that includes crucial modules like FastAPI, BeautifulSoup, JSON, and others.
- Secure management of environment variables via dotenv while adjusting Chrome WebDriver settings for optimum performance.

## Installation

To install the required packages for the Carpool Platform, follow the steps below:

1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/SamIron0/cruiseo
   ```

2. Navigate to the project directory.
   ```bash
   cd carpool-platform
   ```

3. Install the dependencies using npm.
   ```bash
   npm install
   ``` 

## Build

To build the Carpool Platform, use the following command:

```bash
npm run build
```

## Run

To run the Carpool Platform, use the following command:

```bash
npm run start
```

Make sure you have completed the installation and build steps before running the application.

## Configuration

The Carpool Platform uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the required variables. Refer to the `.env.example` file for the list of variables needed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

The Carpool Platform is licensed under the MIT License.
