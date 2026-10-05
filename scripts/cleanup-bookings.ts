// Delete all test bookings from database
// Usage: npx tsx scripts/cleanup-bookings.ts

import { createAdminClient } from "@/lib/supabase/admin";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

async function main() {
  const admin = createAdminClient();

  console.log("🗑️  Deleting all test bookings...\n");

  const { data: allBookings, error: fetchError } = await admin
    .from("bookings")
    .select("id, guest_name, booking_date, status");

  if (fetchError) {
    console.error("❌ Error fetching bookings:", fetchError.message);
    process.exit(1);
  }

  if (!allBookings || allBookings.length === 0) {
    console.log("✓ No bookings found. Database is already clean.");
    return;
  }

  console.log(`Found ${allBookings.length} bookings:\n`);
  allBookings.forEach((b) => {
    console.log(
      `  • ${b.guest_name} | ${b.booking_date} | ${b.status}`,
    );
  });

  console.log(`\nDeleting all ${allBookings.length} bookings...\n`);

  const { error: deleteError } = await admin
    .from("bookings")
    .delete()
    .neq("id", ""); // delete all

  if (deleteError) {
    console.error("❌ Error deleting bookings:", deleteError.message);
    process.exit(1);
  }

  console.log(`✓ Successfully deleted ${allBookings.length} bookings`);
  console.log("✓ Admin area is now clean");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
