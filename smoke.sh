#!/usr/bin/env bash
set -euo pipefail
BASE_URL=${BASE_URL:-http://localhost:5050/api}

TS=$(date +%s)
SHELTER_EMAIL="biz$TS@test.com"
USER_EMAIL="user$TS@test.com"
SHELTER_PASS="Biz1234!"
USER_PASS="User1234!"

register() { curl -s -X POST "$BASE_URL/auth/register" -H "Content-Type: application/json" -d "$1"; }
login() { curl -s -X POST "$BASE_URL/auth/login" -H "Content-Type: application/json" -d "$1" | jq -r '.token'; }

register "{\"email\":\"$SHELTER_EMAIL\",\"password\":\"$SHELTER_PASS\",\"name\":\"Shelter\",\"role\":\"shelter\"}" >/dev/null
register "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASS\",\"name\":\"User\",\"role\":\"regular\"}" >/dev/null

TOKEN_SHELTER=$(login "{\"email\":\"$SHELTER_EMAIL\",\"password\":\"$SHELTER_PASS\"}")
TOKEN_USER=$(login "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASS\"}")

PET_PAYLOAD='{"name":"Rocky","species":"Dog","breed":"Mixed","age":3,"image":"https://via.placeholder.com/400x250","description":"Energetic and friendly"}'
PET_ID=$(curl -s -X POST "$BASE_URL/pets" -H "Authorization: Bearer $TOKEN_SHELTER" -H "Content-Type: application/json" -d "$PET_PAYLOAD" | jq -r '._id')

test -n "$PET_ID"

ALL_COUNT=$(curl -s "$BASE_URL/pets" | jq 'length')
DOG_COUNT=$(curl -s "$BASE_URL/pets?type=Dog" | jq 'length')
SEARCH_COUNT=$(curl -s "$BASE_URL/pets?q=Energetic" | jq 'length')
MY_COUNT=$(curl -s -H "Authorization: Bearer $TOKEN_SHELTER" "$BASE_URL/pets/my-pets" | jq 'length')

curl -s -X PATCH -H "Authorization: Bearer $TOKEN_USER" "$BASE_URL/pets/$PET_ID/favorite" >/dev/null
FAV_LEN=$(curl -s -H "Authorization: Bearer $TOKEN_USER" "$BASE_URL/pets/favorites" | jq 'length')

UPDATED=$(curl -s -X PUT "$BASE_URL/pets/$PET_ID" -H "Authorization: Bearer $TOKEN_SHELTER" -H "Content-Type: application/json" -d '{"age":4}' | jq -r '.age')
curl -s -X DELETE "$BASE_URL/pets/$PET_ID" -H "Authorization: Bearer $TOKEN_SHELTER" >/dev/null
AFTER_DELETE=$(curl -s "$BASE_URL/pets/$PET_ID" | jq -r '._id' 2>/dev/null || true)

echo "ALL_COUNT=$ALL_COUNT"
echo "DOG_COUNT=$DOG_COUNT"
echo "SEARCH_COUNT=$SEARCH_COUNT"
echo "MY_COUNT=$MY_COUNT"
echo "FAV_LEN=$FAV_LEN"
echo "UPDATED_AGE=$UPDATED"
echo "AFTER_DELETE=$AFTER_DELETE"