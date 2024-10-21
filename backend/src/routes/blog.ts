import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import {verify} from "hono/jwt"
import {createBlogInputs, updateBlogInputs } from "@tushar0810/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables:{
        UserId : string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || " "
    try{
        const User = await verify(header,c.env.JWT_SECRET);
        if(User){
            //@ts-ignore
          c.set("UserId",User.id);
           await next();
        }
        else{
        c.status(403)
        return c.json({
            msg:"you are not login"
        })
        }
    }catch(e){
        c.status(403);
        return c.json({
            msg:"you are not logged in"
        })
    }
})
///////////////Error post ha arra ka name  not blog
blogRouter.post('/create', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInputs.safeParse(body)
    if(!success){
        c.status(411)
        c.json({
            msg:"wrong Data"
        })
    }
    const UserId = c.get('UserId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId:UserId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/edit', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInputs.safeParse(body)
    if(!success){
        c.status(411)
        c.json({
            msg:"input are wrong"  
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog =  await  prisma.post.update({
      where:{
        id:body.id
      },  
    data:{
            title: body.title,
            content: body.content,
        }
     })
    return c.json({
        id: blog.id
    })
})
//Todo :  Pagination 
// blogRouter.get('/bulk', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())
//     const blogs = await prisma.post.findMany({
//             select:{
//                 content:true,
//                 title:true,
//                 id:true,
//                 author: {
//                     select:{
//                         name:true,
//                     }
//                 }
//             }
//         });

//       return c.json({
//         blogs
//     })
//  })
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    
    const page = parseInt(c.req.query('page') || '1', 10);
    const limit = parseInt(c.req.query('limit') || '8', 10);
    // const limit = parseInt(c.req.query('limit') || '5');
    
    const skip = (page - 1) * limit;
    
    console.log(page);
    // Fetch paginated blog posts with author information
    const blogs = await prisma.post.findMany({
        skip: skip,   // Skip previous records based on the offset
        take: limit,    // Limit the number of results per page
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    // Fetch the total number of posts for pagination metadata
    const totalPosts = await prisma.post.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalPosts / limit);

    return c.json({
        blogs,
        meta: {
            currentPage: page,
            totalPages,
            totalPosts,
            limit,
        },
    });
});
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{

        const blog =  await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
                title:true,
                content:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
             blog:blog
        })
    }
    catch(e){
        return c.json({
            msg:"Error while fetching blogs post"
        });
    }
})