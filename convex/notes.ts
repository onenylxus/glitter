import { Id } from './_generated/dataModel';
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

export const archive = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const target = await ctx.db.get(args.id);
    if (!target) {
      throw new Error('Note not found');
    }
    if (target.userId !== userId) {
      throw new Error('Note not authorized');
    }

    const archiveChildren = async (id: Id<'notes'>) => {
      const children = await ctx.db
        .query('notes')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parent', id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        await archiveChildren(child._id);
      }
    };

    const note = await ctx.db.patch(args.id, {
      isArchived: true,
    });
    archiveChildren(args.id);

    return note;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const notes = await ctx.db
      .query('notes')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), true))
      .order('desc')
      .collect();

    return notes;
  },
});

export const restore = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const target = await ctx.db.get(args.id);
    if (!target) {
      throw new Error('Note not found');
    }
    if (target.userId !== userId) {
      throw new Error('Note not authorized');
    }

    const restoreChildren = async (id: Id<'notes'>) => {
      const children = await ctx.db
        .query('notes')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parent', id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });
        await restoreChildren(child._id);
      }
    };

    let isParentArchived = false;
    if (target.parent) {
      const parent = await ctx.db.get(target.parent);
      if (parent?.isArchived) {
        isParentArchived = true;
      }
    }

    const note = await ctx.db.patch(args.id, {
      parent: isParentArchived ? undefined : target.parent,
      isArchived: false,
    });
    restoreChildren(args.id);

    return note;
  },
});

export const remove = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const target = await ctx.db.get(args.id);
    if (!target) {
      throw new Error('Note not found');
    }
    if (target.userId !== userId) {
      throw new Error('Note not authorized');
    }

    const note = await ctx.db.delete(args.id);

    return note;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const notes = await ctx.db
      .query('notes')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    return notes;
  },
});

export const getById = query({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new Error('Note not found');
    }
    if (note.isPublished && !note.isArchived) {
      return note;
    }

    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    if (note.userId !== userId) {
      throw new Error('Note not authorized');
    }

    return note;
  },
});

export const update = mutation({
  args: {
    id: v.id('notes'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }

    const userId = identity.subject;
    const { id, ...rest } = args;
    const target = await ctx.db.get(args.id);
    if (!target) {
      throw new Error('Note not found');
    }
    if (target.userId !== userId) {
      throw new Error('Note not authorized');
    }

    const note = await ctx.db.patch(args.id, { ...rest });

    return note;
  },
});
