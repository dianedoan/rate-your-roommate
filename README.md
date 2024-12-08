# seng513-fall24-group-4

## Deployment

To deploy the web app locally using Docker, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repository/seng513-fall24-group-4.git
    cd seng513-fall24-group-4
    ```

2. **Build the Docker image**:

    ```bash
    docker-compose up --build
    ```

    This will start the web app on your local machine, accessible at [http://localhost:3000](http://localhost:3000).

    **Note**: While the app will run locally on your machine, it will not function properly for devices that are not using `localhost`, because AWS DynamoDB is set up with a private server. Features that require database access will only work for the local machine where the app is running.

3. To access the fully functional version of the app for devices that are not using `localhost`, please use the deployed website:

    [https://rate-your-roommate.netlify.app/](https://rate-your-roommate.netlify.app/)
    
