import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    if (!this.socket) {
      this.socket = io('http://localhost:5000', {
        transports: ['websocket'],
        upgrade: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
        if (userId) {
          this.socket.emit('join', userId);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  // Helper method to join user room
  joinUserRoom(userId) {
    if (this.socket && userId) {
      this.socket.emit('join', userId);
    }
  }

  // Helper method to leave user room
  leaveUserRoom(userId) {
    if (this.socket && userId) {
      this.socket.emit('leave', userId);
    }
  }
}

export default new SocketService();
