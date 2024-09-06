# Wame Technical Interview API Project

This API allows you to manage match records. You can create new matches, retrieve all matches, or fetch a specific match by its ID.

## Endpoints

### 1. Create a Match

**`POST /matches`**

Request JSON:

```json
{
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "matchDate": "2024-09-07",
  "matchTime": "15:00"
}
```

**Response**:
- **Status Code**: `201 Created`
- **Body**: Includes the created match record with an `id` and `createdAt` timestamp.

### 2. Get All Matches

**`GET /matches`**

**Response**:
- **Status Code**: `200 OK`
- **Body**: An array of match records.

### 3. Get a Match by ID

**`GET /matches/:id`**

**Parameters**:
- `id` (path parameter): The unique identifier of the match.

**Response**:
- **Status Code**: `200 OK`
- **Body**: The match record with the specified ID.
- **Status Code**: `404 Not Found` (if the match with the provided ID does not exist)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
