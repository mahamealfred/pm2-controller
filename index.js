const express=require("express")
const cron = require('node-cron');
const pm2 = require('pm2');
const app = express();
const PORT = 2000;

//loading middlewares
app.use(express.json());

// Replace 'your-app-name' with the name or ID of the PM2 process you want to stop
const appName = 'xpay-test-apis';

// Schedule the cron job to run at a specific time
// For example, to stop the process at 11:59 PM every day:
cron.schedule('14 11 * * *', () => {
    console.log('Stopping PM2 process...');
    
    pm2.connect((err) => {
        if (err) {
            console.error('PM2 connect error:', err);
            process.exit(2);
        }
        
        pm2.stop(appName, (err, proc) => {
            pm2.disconnect(); // Disconnect from PM2
            
            if (err) {
                console.error('Error stopping process:', err);
                return;
            }

            console.log(`PM2 process ${appName} stopped successfully.`);
        });
    });
}, {
    timezone: "Africa/Kigali" // Replace with your timezone, e.g., "America/New_York"
});

console.log('Cron job scheduled to stop PM2 process.');

app.listen(PORT, () => {

   // comm()
     console.log(`Server is listening on port:${PORT}`);
   });