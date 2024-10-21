import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInputs , signinInputs } from '@tushar0810/medium-common';
export const userRouter =  new Hono<{
    Bindings:{
      DATABASE_URL :string,
      JWT_SECRET:string,
    }
  }>();


userRouter.post('/signup',async (c) => {
  const body =await c.req.json();
  const { success } = signupInputs.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      msg:"wrong inputs"
    })
  }
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
      try{ 
        const User =await prisma.user.create({
          data:{
            email:body.username,
            password:body.password,
            name:body.name
          }
        })
        const token =await sign({id:User.id},c.env.JWT_SECRET)
        return c.json({token})
      }
      catch(e){
        return c.json({
          error:e
        })
      }
      })
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInputs.safeParse(body)
    
    if(!success){
      c.status(411)
      return c.json({
        msg:"wrong inputs"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{
        const User = await prisma.user.findUnique({
          where:{
            email:body.username,
            password:body.password
          }
        })
        if(!User){
          c.status(401)
          return c.json({
            msg:"Worng password OR email"
          })
        }
        const token = await sign({id:User.id},c.env.JWT_SECRET);
      
        return c.json({
              token
        })
      }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
          msg:"invalid"
        })
      }
  })