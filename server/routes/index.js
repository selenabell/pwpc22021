// Importando el router de home 
import homeRouter from './home'; 
// Importando router de users 
import userRouter from './user';

/* GET home page. */
// router.use('/', homeRouter);
// router.use('./user', userRouter);

const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  return app;
};

export default {
  addRoutes,
};


