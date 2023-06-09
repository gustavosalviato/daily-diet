import axios from "axios";
import { z } from 'zod'
import { prisma } from "@/lib/prisma";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { app } from "@/app";
import { env } from "@/env";


export async function UserRegister(request: FastifyRequest, response : FastifyReply) {
    const bodySchema = z.object({
      code: z.string()
    })

    const { code } = bodySchema.parse(request.body)

    const acessTokenResponse = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: env.GIT_HUB_CLIENT_ID,
        client_secret: env.GIT_HUB_CLIENT_SECRET,
        code
      },
      headers: {
        Accept: 'application/json'
      }
    })

    const { access_token } = acessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      avatar_url: z.string().url()
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatar: userInfo.avatar_url,
          email: userInfo.email,
          githubId: userInfo.id,
          name: userInfo.name,
          sequenceCount: 0,
          bestSequence: 0
        }
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatar
      }, {
      sub: user.id,
      expiresIn: '30 days'
    })

    return {
      token
    }

    // app.get('/user/:id', async (request, reply) => {
    //   const paramsSchema = z.object({
    //     id: z.string()
    //   })
  
    //   const { id } = paramsSchema.parse(request.params)
      
    //   const userResponse = await prisma.user.findUnique({
    //     where:{
    //       id
    //     }
    //   })
  
    //   return reply.send(userResponse)
    // })
}