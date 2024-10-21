import { Hono } from 'hono'
import { cors } from 'hono/cors'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { verify } from 'hono/jwt';
// import { sign } from 'hono/utils/jwt/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings:{
    DATABASE_URL :string,
    JWT_SECRET:string,
  }
}>();
app.use('/*', cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)
// app.use('/api/v1/blog/*',async(c,next)=>{
//       const header = c.req.header("Authorization")|| " "
//       const token = header.split(" ")[1];
//       const check = await verify(token,c.env.JWT_SECRET);
//       const response = await verify(token,c.env.JWT_SECRET);
//       if(response.id){
//        next(); 
//       }else{
//        c.status(403)
//        return c.json({
//          msg:"WRONG CREDENTIALS"
//        })
//       } 
//    })
export default app
