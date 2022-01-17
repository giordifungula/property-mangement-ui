import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
// @logic
import { SERVER_HOST, SOCKET_PATH } from 'logic/config';
import { IUserRead } from 'logic/store/stores/users.store';

const socket = io(SERVER_HOST, {
  transports: ['websocket'],
  forceNew: true,
  secure: true,
  path: SOCKET_PATH
});

socket.on('connect_error', () => {
  toast.warning('Not connected to the server', {
    toastId: 'connect_error'
  });
});

socket.on('connect', () => {
  console.log(`CONNECTED: ${socket.connected}`);
});

const options = {};

const client = feathers()
  .configure(
    socketio(socket, {
      timeout: 8000
    })
  )
  .configure(auth(options));

export const getJWT = async (): Promise<string | null> =>
  client.authentication.getAccessToken();

export const destroyToken = async () => {
  try {
    await client.authentication.removeAccessToken();
  } catch (accessTokenErr: any) {
    console.log('removeAccessToken', accessTokenErr.message);
  }
};

export const authenticateClient = async () => {
  try {
    const { accessToken, user } = (await client.authenticate()) as unknown as {
      accessToken: string;
      user: IUserRead;
    };

    return {
      success: true,
      accessToken,
      user
    };
  } catch (err) {
    destroyToken();
    throw err;
  }
};

export default client;
