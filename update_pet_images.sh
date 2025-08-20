#!/usr/bin/env bash
set -euo pipefail

API="http://localhost:5050/api"

TOKEN_SHELTER=$(
  curl -s -X POST "$API/auth/login" \
    -H 'Content-Type: application/json' \
    -d '{"email":"biz@test.com","password":"Biz1234!"}' \
  | jq -r '.token'
)
if [[ -z "${TOKEN_SHELTER}" || "${TOKEN_SHELTER}" == "null" ]]; then
  echo "Login failed"; exit 1
fi

# Adjust this to the approximate time the bad script ran
CUTOFF="${1:-2025-08-21T00:00:00.000Z}"

PETS=$(curl -s "$API/pets")

echo "$PETS" \
| jq -c --arg cutoff "$CUTOFF" '
  .[]
  | select(.updatedAt >= $cutoff
           or (.image|test("upload\\.wikimedia\\.org|images\\.dog\\.ceo|unsplash\\.com")))
  | {id:._id, name, species, breed, image, updatedAt}
' \
| while read -r row; do
  id=$(echo "$row" | jq -r '.id')
  name=$(echo "$row" | jq -r '.name')
  species=$(echo "$row" | jq -r '.species')
  breed=$(echo "$row" | jq -r '.breed')
  image=$(echo "$row" | jq -r '.image')
  updated=$(echo "$row" | jq -r '.updatedAt')

  echo
  echo "Pet: $name  ($species / $breed)"
  echo "ID:  $id"
  echo "Now: $image"
  echo "Updated: $updated"
  read -rp "Paste ORIGINAL image URL to restore (or Enter to skip): " url
  if [[ -z "${url}" ]]; then
    echo "Skipped $name"
    continue
  fi
  body=$(printf '{"image":"%s"}' "$url")
  code=$(curl -s -o /dev/null -w '%{http_code}' \
    -X PATCH "$API/pets/$id" \
    -H "Authorization: Bearer $TOKEN_SHELTER" \
    -H "Content-Type: application/json" \
    -d "$body")
  echo "HTTP $code  -> restored $name"
done

echo
echo "Done. Re-run with a different cutoff if needed:"
echo "  bash restore_images_interactive.sh 2025-08-21T14:00:00.000Z"