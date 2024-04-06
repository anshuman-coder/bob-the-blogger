import { CreateTagSchema } from '~/components/dashboard/TagModal'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'
import { genPostSlug } from '~/utils/genSlug'
import * as TagService from '~/server/services/tag'
import { z } from 'zod'

const fetchTagSchema = z.object({
  query: z.string().optional()
})

export const tagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateTagSchema)
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const tagSlug = genPostSlug(input.name)

      return TagService.createTag({
        creator: { connect: { id: user.id } },
        name: input.name,
        description: input.description,
        slug: tagSlug,
      }, {
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      })
    }),
  getTags: publicProcedure
    .input(fetchTagSchema)
    .query(async ({ input: { query } }) => TagService.fetchTags(
      {
        name: {
          contains: query ?? '',
          mode: 'insensitive'
        },
      },
      {
        id: true,
        creator: { select: { id: true } },
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      }
    ))
})