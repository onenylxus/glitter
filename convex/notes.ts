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
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const notes = await ctx.db.query('notes').collect();

    return notes;
  },
});