#!/usr/bin/env bash
set -euo pipefail

API_BASE="http://localhost:5050/api"

TOKEN_SHELTER=$(
  curl -s -X POST "$API_BASE/auth/login" \
    -H 'Content-Type: application/json' \
    -d '{"email":"biz@test.com","password":"Biz1234!"}' | jq -r '.token'
)

if [[ -z "${TOKEN_SHELTER}" || "${TOKEN_SHELTER}" == "null" ]]; then
  echo "Login failed. Check shelter credentials." >&2
  exit 1
fi

read -r -d '' DATA <<'JSON'
[
  {
    "name":"Luna",
    "species":"Dog",
    "breed":"Golden Retriever",
    "age":3,
    "gender":"Female",
    "size":"Large",
    "image":"https://upload.wikimedia.org/wikipedia/commons/9/99/Golden_Retriever_Carlos_%2810500999976%29.jpg",
    "description":"Gentle and affectionate. Loves fetch, water, and long walks. Great with kids and pets.",
    "city":"Tel Aviv",
    "status":"available",
    "vaccinated":true,
    "neutered":true,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Rocky",
    "species":"Dog",
    "breed":"Beagle",
    "age":4,
    "gender":"Male",
    "size":"Medium",
    "image":"https://upload.wikimedia.org/wikipedia/commons/5/55/Beagle_600.jpg",
    "description":"Curious and social. Enjoys nose games and park adventures. Best with an active family.",
    "city":"Haifa",
    "status":"available",
    "vaccinated":true,
    "neutered":true,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Miso",
    "species":"Cat",
    "breed":"Siamese",
    "age":2,
    "gender":"Male",
    "size":"Small",
    "image":"https://upload.wikimedia.org/wikipedia/commons/6/69/Siam_blue_point.jpg",
    "description":"Talkative lap cat. Loves window sunbathing and wand toys. Prefers a calm home.",
    "city":"Jerusalem",
    "status":"available",
    "vaccinated":true,
    "neutered":true,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Olive",
    "species":"Rabbit",
    "breed":"Mixed",
    "age":1,
    "gender":"Female",
    "size":"Small",
    "image":"https://upload.wikimedia.org/wikipedia/commons/8/88/Oryctolagus_cuniculus_Rcdo.jpg",
    "description":"Sweet and curious. Enjoys gentle handling, tunnels, and fresh greens. Indoor housing required.",
    "city":"Ashdod",
    "status":"available",
    "vaccinated":true,
    "neutered":false,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Rio",
    "species":"Bird",
    "breed":"Blue-fronted Amazon",
    "age":5,
    "gender":"Male",
    "size":"Small",
    "image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Blue-fronted_Amazon_%28Amazona_aestiva%29_-6a.jpg",
    "description":"Intelligent and social parrot. Needs daily interaction and enrichment. Experienced bird home preferred.",
    "city":"Rishon LeZion",
    "status":"available",
    "vaccinated":false,
    "neutered":false,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Sahara",
    "species":"Horse",
    "breed":"Arabian",
    "age":8,
    "gender":"Female",
    "size":"Large",
    "image":"https://upload.wikimedia.org/wikipedia/commons/1/10/Arabian_Gelding.jpg",
    "description":"Elegant, spirited, and people-oriented. Suitable for an experienced handler with pasture space.",
    "city":"Be'er Sheva",
    "status":"available",
    "vaccinated":true,
    "neutered":false,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Atlas",
    "species":"Reptile",
    "breed":"Spur-thighed Tortoise",
    "age":6,
    "gender":"Male",
    "size":"Medium",
    "image":"https://upload.wikimedia.org/wikipedia/commons/3/3c/Testudo_graeca_ibera_Male.jpg",
    "description":"Calm and hardy tortoise. Needs secure outdoor enclosure and proper UVB. Long-term commitment.",
    "city":"Netanya",
    "status":"available",
    "vaccinated":false,
    "neutered":false,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  },
  {
    "name":"Pixel",
    "species":"Reptile",
    "breed":"Leopard Gecko",
    "age":3,
    "gender":"Female",
    "size":"Small",
    "image":"https://upload.wikimedia.org/wikipedia/commons/2/2a/Leopard_Gecko_Eublepharis_macularius.jpg",
    "description":"Friendly gecko. Eats well and handles gently. Needs heated enclosure and safe hides.",
    "city":"Herzliya",
    "status":"available",
    "vaccinated":false,
    "neutered":false,
    "contactName":"Shelter",
    "contactPhone":"0500000000",
    "contactEmail":"shelter@example.com"
  }
]
JSON

echo "$DATA" | jq -c '.[]' | while read -r pet; do
  RESP=$(curl -s -w ' HTTP:%{http_code}' -X POST "$API_BASE/pets" \
    -H "Authorization: Bearer $TOKEN_SHELTER" \
    -H 'Content-Type: application/json' \
    -d "$pet")
  BODY=$(echo "$RESP" | sed 's/ HTTP:.*$//')
  CODE=$(echo "$RESP" | sed -n 's/^.* HTTP://p')
  ID=$(echo "$BODY" | jq -r '._id // empty')
  NAME=$(echo "$BODY" | jq -r '.name // empty')
  echo "${CODE}  ${ID:-ERR}  ${NAME:-unknown}"
done