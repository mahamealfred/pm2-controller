const express=require("express")
const cron = require('node-cron');
const pm2 = require('pm2');
const app = express();
const PORT = 1400;

//loading middlewares
app.use(express.json());

const appName = 'xpay-test-apis';

// Schedule the cron job to run at a specific time
// For example, to stop the process at 11:59 PM every day:
// cron.schedule('14 11 * * *', () => {
//     console.log('Stopping PM2 process...');
    
//     pm2.connect((err) => {
//         if (err) {
//             console.error('PM2 connect error:', err);
//             process.exit(2);
//         }
        
//         pm2.stop(appName, (err, proc) => {
//             pm2.disconnect(); // Disconnect from PM2
            
//             if (err) {
//                 console.error('Error stopping process:', err);
//                 return;
//             }

//             console.log(`PM2 process ${appName} stopped successfully.`);
//         });
//     });
// }, {
//     timezone: "Africa/Kigali" // Replace with your timezone, e.g., "America/New_York"
// });


cron.schedule('14 11 * * *', () => {
    console.log('Starting PM2 process.');

    pm2.connect((err) => {
        if (err) {
            console.error('PM2 connect error:', err);
            process.exit(2);
        }

        pm2.stop(appName, (err, proc) => {
            pm2.disconnect(); 

            if (err) {
                console.error('Error started process:', err);
                return;
            }

            console.log(`PM2 process ${appName} started successfully.`);
        });
    });
}, {
    timezone: "Africa/Kigali",
    scheduled: true,
    delay: 5 * 24 * 60 * 60 * 1000 
});

console.log('Cron job scheduled to Controlle PM2 process.');

app.listen(PORT, () => {
   // comm()
     console.log(`Server is listening on port:${PORT}`);
   });