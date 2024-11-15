# Database Schema and Seeding Instructions

## Requirements

- Docker and Docker Compose should be installed.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. **Run Docker Compose**  
   Start the MySQL service and load the schema and seed data.

   ```bash
   docker-compose up
   ```

3. **Check if container runs**
   Verify that the MySQL container is running:

   ```bash
   docker ps -a
   ```

   If there are any issues with the container, check the logs for more information:

   ```
   docker logs mysql
   ```

4. **Verify the Database**  
   Connect to the MySQL container and check the tables and data:

   ```bash
   docker exec -it mysql mysql -uroot
   ```

   Then:

   ```sql
   USE app_database;
   SHOW TABLES;
   SELECT * FROM Users; -- To test if data exist
   ```

5. **Stopping the Containers**  
   Once you're done, stop the containers:
   ```bash
   docker-compose down
   ```

<!-- check push -->
