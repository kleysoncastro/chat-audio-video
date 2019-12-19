import express from 'express';
import io from 'socket.io';
import cors from 'cors';
import http from 'http';
import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.socket();
    this.middlewares();
    this.routes();

    this.connectedUser = {};
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUser[user_id] = socket.id;
      console.log(`Usuario conectado ${socket.id}`);
      socket.on('diconnect', () => {
        delete this.connectedUser[user_id];
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUser = this.connectedUser;
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}
export default new App().server;
