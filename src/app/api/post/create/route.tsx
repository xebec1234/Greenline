import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { z } from "zod";

// Validation schema for incoming data
const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  postType: z.enum(["open", "closed"]),
  tags: z.array(z.string()).optional(), // Add tags to the schema
  userId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOption);

    const requestBody = await req.json();
    const parsedData = PostSchema.parse(requestBody);

    const userId = session ? session.user.id : null;

    const anonUser_Id = !userId ? await createAnonymousUser() : null;

    // Create the post
    const post = await db.posts.create({
      data: {
        title: parsedData.title,
        body: parsedData.body,
        post_type: parsedData.postType,
        user_Id: userId ? parseInt(userId) : null,
        anon_user_Id: anonUser_Id ? parseInt(anonUser_Id) : null,
        score: 0,
      },
    });

    // Associate tags with the post if any tags are provided
    if (parsedData.tags && parsedData.tags.length > 0) {
      const tagIds = await Promise.all(
        parsedData.tags.map(async (tagName) => {
          // Find the tag by name using findFirst
          const tag = await db.tags.findFirst({
            where: { tag_name: tagName },
          });
          return tag ? tag.id : null; // Return the tag ID or null if not found
        })
      );

      // Filter out null values (tags that were not found)
      const validTagIds = tagIds.filter((id) => id !== null);

      // Create entries in the Post_Tags table
      await Promise.all(
        validTagIds.map((tagId) => {
          return db.post_Tags.create({
            data: {
              post_Id: post.post_Id,
              tag_id: tagId as number, // Cast to number since we filtered nulls
            },
          });
        })
      );
    }

    // Return the newly created post
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error("Error creating post:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error("Unknown error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

// Helper function to create an anonymous user (if needed)
async function createAnonymousUser() {
  const email = `anon-${Math.random().toString(36).substring(2)}@anon.com`; // Generate a fake email
  const newUser = await db.anonymousUsers.create({
    data: {
      email: email,
    },
  });
  return newUser.id.toString();
}
