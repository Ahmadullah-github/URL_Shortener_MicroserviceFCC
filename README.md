# 🌐 URL Shortener Microservice

🚀 A simple API that shortens URLs and redirects users when they access the shortened links. This project is part of the FreeCodeCamp Backend Development Certification.

## 📌 Features
- Accepts a valid URL and returns a shortened version.
- Redirects users to the original URL when they visit the shortened link.
- Handles invalid URLs with proper error messages.
- Uses a MongoDB database to store shortened URLs.

## 🛠️ Technologies Used
- **Node.js** & **Express** - Backend framework
- **MongoDB** & **Mongoose** - Database and ORM
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/your-username/url-shortener-microservice.git

# Navigate to the project folder
cd url-shortener-microservice

# Install dependencies
npm install
```

## 🚀 Usage
1. Start the server:
   ```sh
   npm start
   ```
2. Open Postman or a browser and use the following endpoints:
   
   - **POST** `/api/shorturl` → Send a URL in the request body to shorten it.
   - **GET** `/api/shorturl/:shortUrl` → Redirects to the original URL.

## 📡 API Endpoints
### 🔗 Shorten a URL
- **Request:**
  ```sh
  POST /api/shorturl
  {
    "url": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "original_url": "https://example.com",
    "short_url": 1
  }
  ```

### 🔄 Redirect to Original URL
- **Request:**
  ```sh
  GET /api/shorturl/1
  ```
- **Response:** Redirects to `https://example.com`

## 📝 Example
1. **Shorten URL**
   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{"url": "https://www.google.com"}' http://localhost:3000/api/shorturl
   ```
2. **Redirect**
   ```sh
   curl -L http://localhost:3000/api/shorturl/1
   ```

## 📜 License
This project is licensed under the MIT License.

---

💡 *Happy Coding!* 🎯

