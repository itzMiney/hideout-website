![https://discord.gg/RstBa889](https://img.shields.io/discord/350718076280504322?color=%2333cc33&label=itzMiney's%20Hideout%20Discord)
![](https://img.shields.io/github/contributors/itzMiney/PVPStatsForClans)
![](https://img.shields.io/github/issues-pr/itzMiney/PVPStatsForClans)
![](https://img.shields.io/github/issues-pr-closed/itzMiney/PVPStatsForClans)
![](https://img.shields.io/github/forks/itzMiney/PVPStatsForClans?label=Forks)
![](https://img.shields.io/github/commit-activity/m/itzMiney/PVPStatsForClans)
![](https://img.shields.io/github/stars/itzMiney/PVPStatsForClans?label=Stars)

# Hideout SMP Website

Welcome to the Hideout SMP Website repository! This repository contains the code and assets for the Hideout SMP network's official website.

## Overview

The Hideout SMP website is designed to provide information and interactive features for the Hideout SMP Minecraft server. It includes various pages such as server status, news, team information, and more.

## Features

- **Home Page**: Provides an overview of the Hideout SMP network and latest updates.
- **Server Status**: Displays the current status of the Minecraft server.
- **Team Information**: Details about the team behind Hideout SMP.
- **Contact Form**: Allows users to contact the team with inquiries or feedback.
- **Styling and Media**: Custom CSS and media assets to enhance the user experience.

## Installation

To set up and run the website locally, follow these steps:

1. **Clone the Repository**:

   ```
   git clone https://github.com/itzMiney/hideout-website
   cd hideout-website
   ```

2. **Create and Activate a Virtual Environment**:

   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:

   ```
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:

   Copy the example environment file and update the variables:

   ```
   cp testing/example.env .env
   ```

   Edit the `.env` file with your configuration.

5. **Run the Application**:

   ```
   python testing/run.py
   ```

   The application will be accessible at `http://localhost:5050`.

## Deployment

For deploying the website to a production environment:

1. **Set Up Production Environment**:

   Follow the same setup steps as above, but ensure you use the production configuration and environment variables.

2. **Deploy Script**:

   Use the provided `deploy.sh` script to sync files from the testing environment to production and ensure the environment is updated:

   ```
   bash deploy.sh
   ```

   This script will:

   - Sync files from the testing directory to the production directory.
   - Ensure dependencies are installed.
   - Handle database migrations (if applicable).
   - Restart the Flask app.

3. **Backup**:

   The deploy script also includes a backup step to ensure no data is lost during deployment.

## File Structure

- `testing/` - Contains the codebase for the testing environment.
- `production/` - Contains the codebase for the production environment.
- `deploy.sh` - Script to deploy changes from testing to production.
- `.env` - Environment variables for local development.

## Contributing

Contributions to the Hideout SMP website are welcome! Please fork the repository and create a pull request with your changes. Ensure that your changes are well-tested and do not break existing functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact the Hideout SMP team at [contact@hideoutsmp.com](mailto:contact@hideoutsmp.com).
