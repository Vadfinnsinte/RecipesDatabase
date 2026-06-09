## KockaLoss

En fullstack-applikation där användare kan skapa, hantera och visa recept med ingredienser och instruktioner. Projektet är byggt med React (frontend) och .NET Web API (backend) med en SQL-databas.

Detta är en simpel version av ett projekt jag lekt med i tankarna ett tag och även börjat på några gånger men min prokrastinering i att faktiskt skriva ner mina recept har gjort mig oinspirerad.

Nu har jag haft möjlighet(om än hastigt) att sätta mig ner och bara göra det, mer som en skiss för frontend och ett experiment i vad som behövs i backend för att det ska bli smidigare när jag tar mig an v2.

Gillar att testa mina ideér med att bygga både backend och frontend. Även om man tänker igenom det mesta och så bra som möjligt så märker jag, när jag kodar frontend att jag missat småsaker som kan göra livet i frontend mycket enklare. Ändringarna för backend är oftast mycket enklare att göra. T.ex, man saknar id i en response, det går att hitta i frontend genom att kalla på en till endpoint, skicka variblen fram och tillbaka med hjälp av state och props. Men det är mycket kod och tar tid. I backend? lägg till Id i DTOn, lägg till en rad där den behövs för mappning i service och kanske ändra i ett interface, sen är de klart.

## Funktioner

- Skapa nya recept
- Lägga till ingredienser till recept
- Lägga till steg-för-steg instruktioner
- Visa fullständiga recept
- Redigera ingredienser och instruktioner
- Radera recept och dess tillhörande ingredienser och instruktioner.
- REST API kommunikation mellan frontend och backend
- Testing av kod i databasen med NSubstitut

## API endpoints:

### Recipe

| Method | Endpoint                 | Body                                        | Response                                     |
| ------ | ------------------------ | ------------------------------------------- | -------------------------------------------- |
| GET    | `/api/Recipes`           | -                                           | 200 OK → Lista av recipes                    |
| GET    | `/api/Recipes/{id}`      | -                                           | 200 OK → Recipe                              |
| GET    | `/api/Recipes/{id}/full` | -                                           | 200 OK → Recipe + ingredients + instructions |
| POST   | `/api/Recipes`           | `{ name, description, cookingTimeMinutes }` | 200 OK → `{ id }`                            |
| PUT    | `/api/Recipes/{id}`      | `{ name, description, cookingTimeMinutes }` | 200 OK → `{ id }`                            |
| DELETE | `/api/Recipes/{id}`      | -                                           | 200 OK                                       |

### Ingredients

| Method | Endpoint                             | Body                               | Response                        |
| ------ | ------------------------------------ | ---------------------------------- | ------------------------------- |
| GET    | `/api/Ingredients`                   | -                                  | 200 OK → Lista av ingredients   |
| GET    | `/api/Ingredients/{id}`              | -                                  | 200 OK → Ingredient             |
| GET    | `/api/Ingredients/recipe/{recipeId}` | -                                  | 200 OK → Ingredients per recipe |
| POST   | `/api/Ingredients`                   | `{ name, amount, unit, recipeId }` | 200 OK → `{ id }`               |
| PUT    | `/api/Ingredients/{id}`              | `{ name, amount, unit }`           | 204 No Content                  |
| DELETE | `/api/Ingredients/{id}`              | -                                  | 204 No Content                  |

### Instructions

| Method | Endpoint                              | Body                                    | Response                         |
| ------ | ------------------------------------- | --------------------------------------- | -------------------------------- |
| GET    | `/api/Instructions`                   | -                                       | 200 OK → Lista av instructions   |
| GET    | `/api/Instructions/{id}`              | -                                       | 200 OK → Instruction             |
| GET    | `/api/Instructions/recipe/{recipeId}` | -                                       | 200 OK → Instructions per recipe |
| POST   | `/api/Instructions`                   | `{ stepNumber, description, recipeId }` | 200 OK → `{ id }`                |
| PUT    | `/api/Instructions/{id}`              | `{ stepNumber, description }`           | 204 No Content                   |
| DELETE | `/api/Instructions/{id}`              | -                                       | 204 No Content                   |

## Models

### Recipe:

| Field              | Type              | Description             |
| ------------------ | ----------------- | ----------------------- |
| Id                 | int               | Primary key             |
| Name               | string            | Recipe name             |
| Description        | string            | Recipe description      |
| CookingTimeMinutes | int               | Cooking time in minutes |
| Ingredients        | List<Ingredient>  | Navigation property     |
| Instructions       | List<Instruction> | Navigation property     |

##### CreateRecipeDto:

| Field              | Type   | Validation             |
| ------------------ | ------ | ---------------------- |
| Name               | string | Required, 2–100 chars  |
| Description        | string | Required, 5–1000 chars |
| CookingTimeMinutes | int    | Required, 1–10000      |

##### RecipeResponseDto:

| Field              | Type   |
| ------------------ | ------ |
| Id                 | int    |
| Name               | string |
| Description        | string |
| CookingTimeMinutes | int    |

##### RecipeDetailDto:

| Field        | Type                         |
| ------------ | ---------------------------- |
| Id           | int                          |
| Name         | string                       |
| Ingredients  | List<IngredientResponseDto>  |
| Instructions | List<InstructionResponseDto> |

### Ingredient:

| Field    | Type    | Description             |
| -------- | ------- | ----------------------- |
| Id       | int     | Primary key             |
| Name     | string  | Ingredient name         |
| Amount   | decimal | Quantity                |
| Unit     | string  | Unit (e.g. tsp, g, pcs) |
| RecipeId | int     | Foreign key             |
| Recipe   | Recipe  | Navigation property     |

##### CreateIngredientDto:

| Field    | Type    | Validation            |
| -------- | ------- | --------------------- |
| Name     | string  | Required, 2–100 chars |
| Amount   | decimal | Required, 0.01–10000  |
| Unit     | string  | Required, 1–10 chars  |
| RecipeId | int     | Required              |

##### UpdateIngredientDto:

| Field  | Type    | Validation            |
| ------ | ------- | --------------------- |
| Name   | string  | Required, 2–100 chars |
| Amount | decimal | Required, 0.01–10000  |
| Unit   | string  | Required, 1–10 chars  |

##### IngredientResponseDto:

| Field    | Type    |
| -------- | ------- |
| Id       | int     |
| Name     | string  |
| Amount   | decimal |
| Unit     | string  |
| RecipeId | int     |

### Instruction:

| Field       | Type   | Description         |
| ----------- | ------ | ------------------- |
| Id          | int    | Primary key         |
| StepNumber  | int    | Order of step       |
| Description | string | Step text           |
| RecipeId    | int    | Foreign key         |
| Recipe      | Recipe | Navigation property |

##### CreateInstructionDto:

| Field       | Type   | Validation            |
| ----------- | ------ | --------------------- |
| StepNumber  | int    | Required, min 1       |
| Description | string | Required, 5–500 chars |
| RecipeId    | int    | Required              |

##### UpdateInstructionDto:

| Field       | Type   | Validation            |
| ----------- | ------ | --------------------- |
| StepNumber  | int    | Required, min 1       |
| Description | string | Required, 5–500 chars |

##### InstructionResponseDto:

| Field       | Type   |
| ----------- | ------ |
| Id          | int    |
| StepNumber  | int    |
| Description | string |
| RecipeId    | int    |

### Shared DTO

##### CreateResponseDto:

| Field | Type |
| ----- | ---- |
| Id    | int  |

### Notes:

| Topic      | Info                                     |
| ---------- | ---------------------------------------- |
| Validation | DataAnnotations used in DTOs             |
| Relations  | Recipe → Ingredients & Instructions      |
| Pattern    | DTO-based API (no direct model exposure) |

## Förbättringar:

Jag har många saker jag gärna hade hunnit gjort med denna redan nu. Tiden har tyvärr inte räckt till. Men några av mina planer och tankar är:

#### Backend:

- Använda mig av token och inloggning.
- Authorize i alla endpoints förutom GET.
- Lägga till roller Admin/Contributor möjligtvis även Guest och User i framtiden.
- Lägga till fler attribut i modellerna. tex. Tip, exchangable, allergies osv.
- Fler och bättre tester, större edge-cases och fler endpoints testade.
- lägga till endpoints för filtering och sök.

#### Frontend:

- Göra om i Blazor, så att jag lär mig det bättre och för att det låter kul.
- Lägga till Login sida.
- Mycket mer validering i formulären.
- Göra det som inte nu är resposivt i designen till responsiv.
- Bättre errorhantering och hur jag visar detta för användaren.
- Lägga till en statehanterare för bättre struktur i filer och mindre användning av props.
- Skriva om en del componenter så att de kan användas många gånger.
- Dela upp CSS-filerna på ett snyggt sätt, har jobbat snabbt och inte hållit isär så väl som jag velat.
