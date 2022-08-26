import { app } from './app';

app.listen(3333);

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);