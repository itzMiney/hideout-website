// Function to fetch server status from API
function checkServerStatus() {
    fetch('https://api.mcstatus.io/v2/status/java/play.hideoutsmp.net')
        .then(response => {
            // Check if the response is okay (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if the data contains the expected properties
            if (data && data.online !== undefined && data.players) {
                if (data.online) {
                    document.getElementById('serverStatus').textContent = 'Online';
                    document.getElementById('serverStatus').className = 'online';

                    // Display number of players online out of max players
                    const playersOnline = data.players.online;
                    const maxPlayers = data.players.max;
                    document.getElementById('playersOnline').textContent = `${playersOnline} / ${maxPlayers} Players`;
                } else {
                    document.getElementById('serverStatus').textContent = 'Offline';
                    document.getElementById('serverStatus').className = 'offline';
                    document.getElementById('playersOnline').textContent = ''; // Clear player count if offline
                }
            } else {
                throw new Error('Unexpected data format');
            }
        })
        .catch(error => {
            console.error('Error fetching server status:', error);
            document.getElementById('serverStatus').textContent = 'Error fetching status';
            document.getElementById('serverStatus').className = 'error';
            document.getElementById('playersOnline').textContent = ''; // Clear player count on error
        });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', checkServerStatus);

// Automatically refresh server status every 30 seconds (adjust as needed)
setInterval(checkServerStatus, 30000);
