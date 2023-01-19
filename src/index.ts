import express from 'express';
import routes from './routes/index';

const app: express.Application = express();
const port: string = '8080'; // Default port
parseInt(port);

// Adding Routes
app.use('/api', routes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`<!DOCTYPE html>
    <html>
    <head>
    <style>
    body{
        display: grid;
        text-align: center;
        text-justify: center;
        align-items: center;
        background-color: black;
    }

    p {
      font-size: 1.5em;
    }

    div {
      border-left: 9px solid blue;
      background-color: #4158D0;
      background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
      padding: 20px;
      display: grid;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }


    .btn-grad {
      background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
      margin: 10px;
      padding: 15px 45px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      display: block;
    }

    .btn-grad:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }

    </style>
    </head>
    <body>

    <div>
    <h1> Welcome To Image Processing API </h1>
    <p>Click the Button Bellow to Resize The Picture.</p>

    <button class="btn-grad" onclick="window.location.href='http://localhost:8080/api/images?filename=Stanly&width=1000&height=1000';"> Press Me </button>
    </div>

    </body>
    </html>`);
});

// Starting Server
app.listen(
  port,
  async (): Promise<void> => {
    const url: string = `\x1b[35mhttp://localhost:${port}\x1b[0m`;
    console.log(`Server Running at: ${url} Hope U Like it ;)`);
  }
);

export { app, port };
