import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'; 
// import helmet from 'helmet'
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/error.js' ;
import notFound from './middlewares/notFound.js';
import partsRouter from './categories/parts/parts.route.js';
import transactionsInRouter from './categories/transactions/transactionsIn/transactionsIn.route.js';
import transactionsOutRouter from './categories/transactions/transactionsOut/transactionsOut.route.js';
import EmployeesRouter from './categories/employees/employees.route.js'
import sections from './categories/sections/sections.route.js'
import machines from './categories/machines/machines.route.js'
import logIn from './categories/logIn/logIn.route.js'
import requireAuth from './middlewares/auth.js';
import suppliersRouter from './categories/suppliers/suppliers.route.js'
// import borrowsRouter from './categories/borrows/borrows.route.js'

const port = process.env.PORT || 8000 
const app = express() ;
// app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000" ,
  methods: ["GET", "POST"],        // الأساليب المسموح بها
  credentials: true                // إذا تريد الكوكيز
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/auth',logIn); // no need for auth verification

app.use(requireAuth);

app.use('/api/parts',partsRouter);
app.use('/api/transactions/transactionsIn',transactionsInRouter);
app.use('/api/transactions/transactionsOut',transactionsOutRouter);
app.use('/api/Employees',EmployeesRouter);
app.use('/api/sections' , sections);
app.use('/api/machines',machines);
app.use('/api/suppliers' , suppliersRouter);
// app.use('/api/borrows',borrowsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server is live at port ${port}`));

