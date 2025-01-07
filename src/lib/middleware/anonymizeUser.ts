import { db } from "@/lib/db";
import { createId } from "@paralleldrive/cuid2";

/**
 * Anonymizes a user's account while retaining the user ID for relational integrity.
 * @param {string} userId - The ID of the user to anonymize.
 * @returns {Promise<void>}
 */
export async function anonymizeUser(userId: string) {
    const generatedCuid = createId();
  const anonymizedEmail = `${generatedCuid}@deleted`;

  try {
    await db.users.update({
      where: { id: parseInt(userId) },
      data: {
        email: anonymizedEmail,
        username: null, // Clear sensitive personal information
        profile_pic_url: null, // Optional: Clear the profile picture or other fields
      },
    });
    console.log(`User with ID ${userId} has been anonymized.`);
  } catch (error) {
    console.error(`Failed to anonymize user with ID ${userId}:`, error);
    throw new Error("An error occurred while anonymizing the user.");
  }
}
