import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    userId: v.string(),
    parent: v.optional(v.id('notes')),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
  })
    .index('by_user', ['userId'])
    .index('by_user_parent', ['userId', 'parent']),
});
