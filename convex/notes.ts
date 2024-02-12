import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    title: v.string(),
    parent: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const note = await ctx.db.insert('notes', {
      title: args.title,
      userId,
      parent: args.parent,
      isArchived: false,
      isPublished: false,
    });

    return note;
  },
});

export const read = query({
  args: {
    parent: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const notes = await ctx.db
      .query('notes')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', userId).eq('parent', args.parent)
      )
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    return notes;
  },
});
