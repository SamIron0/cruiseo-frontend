# Carpool Platform

The Carpool Platform is an effective web application built to streamline carpooling services. It utilizes a web scraper, based on the Selenium WebDriver, to draw out trip costs, which are then accessed by an AWS Lambda function when triggered through an AWS API Gateway by nExtsjs frontend code. The scraper is locally hosted on a MacBook server and made available with ngrok, while the frontend is hosted on Vercel. Additionally, the platform takes advantage of well-regarded technologies and services such as AWS API Gateway, FastAPI, BeautifulSoup, JSON, among others.

This repo contains only the front end code. Refer to the README file in the general repo @ https://github.com/SamIron0/cruiseo for the full project links.

## Key Features 
- A frontend structure architected using Next.js, React, and TypeScript (TSX) on Vercel.
- Integration of Tailwind CSS and shadcn ui to design a visually compelling website layout.
- Auth handling using Supabase 

## Installation

To install the required packages for the Carpool Platform, follow the steps below:

1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/SamIron0/cruiseo-frontend
   ```

2. Navigate to the project directory.
   ```bash
   cd cruiseo-frontend
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

The Carpool projects uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the required variables. Refer to the `.env.example` file for the list of variables needed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

The Carpool Platform is licensed under the MIT License.
