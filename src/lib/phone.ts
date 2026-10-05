/**
 * Joins the parts of phone numbers with non-breaking spaces, so "+91" and the
 * rest of the number always stay on one line. Safe on any text: only runs of
 * 7+ digits/spaces (optionally starting with "+") are touched.
 */
export function keepPhoneTogether(text: string): string {
  return text.replace(/\+?\d[\d ]{5,}\d/g, (number) =>
    number.replace(/ /g, " "),
  );
}
