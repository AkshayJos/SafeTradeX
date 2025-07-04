export function formatDecimalWithEllipsis(value) {
  if (typeof value !== "number") return "-";

  const original = value.toString();
  const decimalPart = original.split(".")[1];

  if (!decimalPart || decimalPart.length <= 5) {
    return original;
  }

  const fixed = value.toFixed(5);
  return `${fixed}…`;
}
