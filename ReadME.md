# 🐾 PetPal – מערכת לאימוץ חיות

ברוכים הבאים ל־**PetPal** – פרויקט הגמר שלי בקורס Full Stack.  
המטרה של המערכת היא לאפשר לאנשים למצוא ולאמץ חיות מחמד, ולבעלי עמותות/מקלטים (**shelter**) לנהל את בעלי החיים שלהם בצורה נוחה ופשוטה.

---

##  מה המערכת עושה?

- **משתמש רגיל** יכול:
  - להירשם ולהתחבר למערכת.
  - לעיין בכל החיות ולסנן לפי קטגוריות (כלבים, חתולים, ארנבים, ציפורים, סוסים, זוחלים).
  - לסמן חיות כמועדפות ולראות אותן בדף **Favorites**.

- **משתמש עם הרשאת Shelter/Admin** יכול:
  - להוסיף חיה חדשה לאימוץ.
  - לערוך ולמחוק חיות שפרסם.
  - לצפות בדף **My Pets** שמרכז את כל החיות שפרסם.

---

##  טכנולוגיות

- **Frontend:** React + Vite, React Router  
- **Styles:** CSS מודולרי בתיקיית `client/src/styles` (עיצוב עקבי, רספונסיביות, Toast)  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas (Mongoose)  
- **Auth:** JWT + Middleware לתפקידי משתמש (**regular**, **shelter**, **admin**)  
- **HTTP:** Axios עם Interceptor לטוקן  

---

##  איך להריץ את הפרויקט?

1. לשכפל את הריפו:
   ```bash
   git clone <repo-url>
   cd PetPalFinalProjectHackerU
   ```

2. התקנות:
   ```bash
   cd server && npm i
   cd ../client && npm i
   ```

3. להגדיר קובץ `server/.env`:
   ```env
   DB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret
   PORT=5050
   ```

4. להריץ שרת:
   ```bash
   cd server
   npm run dev
   ```
   ברירת מחדל: `http://localhost:5050`

5. להריץ לקוח:
   ```bash
   cd client
   npm run dev
   ```
   ברירת מחדל: `http://localhost:5173`

---

##  משתמשי בדיקות

- Shelter: `biz@test.com` / `Biz1234!`  
- Regular: `user2@test.com` / `User1234!`  

---

##  הרשאות

- **Navbar**:
  - אורח: Home, Pets, About, Login, Register.  
  - Regular: Home, Pets, About, Favorites, Logout.  
  - Shelter/Admin: Home, Pets, About, Add Pet, My Pets, Logout.  

- **Protected Routes**:
  - `/add-pet`, `/my-pets` → Shelter/Admin בלבד.  
  - `/favorites` → כל משתמש מחובר.  

---

##  פיצ’רים מרכזיים

- Home: באנר + “Browse by Pet Type”.  
- Pets: רשימת חיות עם סינון לפי סוג.  
- Pet Details: כל השדות כולל פרטי קשר.  
- Favorites: שמירת מועדפים למשתמש רגיל.  
- My Pets: ניהול חיות של העמותה.  
- Toast Notifications: לכל פעולה חשובה.  
- Responsive: תפריט המבורגר במובייל + עיצוב עקבי.  
- Footer צמוד לתחתית.  

---

## 📜 רישוי

לצורכי לימוד והדגמה במסגרת הקורס.  
