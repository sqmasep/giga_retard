import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { requireAuthProcedure } from "../middleware/auth";
import { z } from "zod";
import { newPostSchema } from "./validation/posts";

export const postsRouter = router({
  new: requireAuthProcedure
    .input(newPostSchema)
    .mutation(async ({ ctx, input }) => {
      const { description, title } = input;

      return await ctx.prisma.post.create({
        data: {
          description,
          title,
          authorId: ctx.session.user.id,
        },
      });
    }),

  save: requireAuthProcedure
    .input(
      z.object({
        saved: z.boolean(),
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.savedPost.upsert({
        where: {
          userId_postId: {
            userId: ctx.session.user.id,
            postId: input.postId,
          },
        },
        update: {
          saved: input.saved,
        },
        create: {
          saved: input.saved,
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });
    }),

  rate: requireAuthProcedure
    .input(
      z.object({
        rating: z.number().min(0).max(5).or(z.null()),
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.rating);
      return await ctx.prisma.ratedPost.upsert({
        where: {
          userId_postId: {
            userId: ctx.session.user.id,
            postId: input.postId,
          },
        },
        update: {
          rating: input.rating || null,
        },
        create: {
          rating: input.rating,
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        deleted: false,
      },
      include: {
        author: true,
        savedPost: ctx.session?.user.id
          ? { where: { userId: ctx.session.user.id } }
          : false,
        ratedPost: ctx.session?.user.id
          ? { where: { userId: ctx.session.user.id } }
          : false,
      },
    });

    return posts;
  }),

  rating: router({
    average: publicProcedure
      .input(z.object({ postId: z.string().uuid() }))
      .query(async ({ ctx, input }) => {
        return await ctx.prisma.ratedPost.groupBy({
          by: ["postId"],
          _avg: {
            rating: true,
          },
          where: {
            postId: input.postId,
          },
        });
      }),
  }),

  byPostId: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.post.findUniqueOrThrow({
        where: {
          id: input.postId,
        },
        include: {
          savedPost: {
            where: {
              // postId: input.postId,
              userId: ctx.session?.user.id,
            },
          },
          ratedPost: {
            where: {
              postId: input.postId,
              userId: ctx.session?.user.id,
            },
          },
          author: true,
          Comment: {
            include: {
              user: true,
              CommentInteraction: {
                where: {
                  userId: ctx.session?.user.id,
                },
              },
            },
          },
        },
      });
    }),

  byProfileId: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: input.userId,
          deleted: false,
        },
        include: {
          author: true,
        },
      });

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      return {
        posts,
        user,
      };
    }),

  personalInfos: requireAuthProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
    });

    return {
      posts,
    };
  }),

  savedPosts: requireAuthProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.savedPost.findMany({
      where: {
        userId: ctx.session.user.id,
        saved: true,
      },
      include: {
        Post: {
          include: {
            author: true,
            ratedPost: {
              where: {
                userId: ctx.session.user.id,
              },
            },
          },
        },
      },
    });
  }),

  delete: requireAuthProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });

      // DANGER: might be dangerous to do it like so??
      if (!post || post?.authorId !== ctx.session.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      console.log("yes youre gonna delete it");
      console.log(input.postId);
      const a = await ctx.prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          deleted: true,
        },
      });
      console.log(a);
      console.log(input);

      return a;
    }),
});
