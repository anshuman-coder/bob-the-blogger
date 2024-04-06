import {
  createTRPCRouter,
  protectedProcedure,
} from '~/server/api/trpc';
import { writeFormSchema } from '~/components/dashboard/WriteModal'
import * as PostService from '~/server/services/post'
import { genPostSlug } from '~/utils/genSlug'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(writeFormSchema.extend({ tags: z.array(z.string()).min(0) }))
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const slug = genPostSlug(input.title)
      return PostService.createPost(
        {
          author: { connect: { id: user.id } },
          title: input.title,
          description: input.description,
          slug,
          html: input.html,
          tags: input.tags.length > 0 ? {
            createMany: {
              data: input.tags.map(t => ({ tagId: t })),
              skipDuplicates: true,
            },
          } : undefined,
        }
      )
    }),
});
