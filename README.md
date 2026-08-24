# 🚀 ZeeAI — Full-Stack AI SaaS Platform (PERN Architecture)

ZeeAI is a production-ready, full-stack Software-as-a-Service (SaaS) platform powered by the **PERN stack** (PostgreSQL / Neon DB, Express.js, React 19, Node.js) and integrated with state-of-the-art Generative AI models. It provides content creators, marketers, and professionals with a comprehensive suite of AI-driven creative tools, tier-based billing gating, and a community showcase.

---

## 📑 Table of Contents

1. [High-Level System Architecture](#-high-level-system-architecture)
2. [End-to-End Architectural Ecosystem](#-end-to-end-architectural-ecosystem)
3. [Architecture Tiers & Component Breakdown](#-architecture-tiers--component-breakdown)
   - [Frontend Tier (Client Layer)](#1-frontend-tier-client-layer)
   - [Backend Tier (Application & API Layer)](#2-backend-tier-application--api-layer)
   - [Database & Storage Tier (Persistence Layer)](#3-database--storage-tier-persistence-layer)
   - [AI & External Services Tier (Intelligence Layer)](#4-ai--external-services-tier-intelligence-layer)
4. [Data Flow & Sequence Workflows](#-data-flow--sequence-workflows)
   - [Text Generation Workflow](#1-text-generation-workflow-article--blog-titles)
   - [Image Generation & Media Pipeline](#2-image-generation--media-pipeline)
   - [Resume Review Pipeline](#3-resume-review-pipeline)
   - [Community & Social Interaction Workflow](#4-community--social-interaction-workflow)
5. [Database Schema & Data Model](#-database-schema--data-model)
6. [Complete Project Structure](#-complete-project-structure)
7. [API Endpoint Reference](#-api-endpoint-reference)
8. [Authentication, Subscription & Gating Model](#-authentication-subscription--gating-model)
9. [Environment Variables Matrix](#-environment-variables-matrix)
10. [Deployment & Infrastructure](#-deployment--infrastructure)
11. [Local Development Setup](#-local-development-setup)

---

## 🏛️ High-Level System Architecture

The following diagram illustrates the overarching system topology and how the different services, clients, pipelines, and persistence mechanisms communicate:

```mermaid
graph TB
    subgraph ClientLayer["🖥️ Client Layer (Frontend SPA)"]
        Browser["User Browser / Mobile Client"]
        ReactApp["React 19 + Vite SPA<br/>Tailwind CSS v4 + Lucide Icons"]
        ClerkClientSDK["@clerk/clerk-react<br/>(JWT Token & User Session)"]
        Browser --> ReactApp
        ReactApp --> ClerkClientSDK
    end

    subgraph AuthLayer["🔐 Identity & Subscription Management"]
        ClerkAuth["Clerk Auth Service"]
        ClerkMetadata["User Private Metadata<br/>(Plan Tier: Free / Premium, Quotas)"]
        ClerkClientSDK <--> ClerkAuth
        ClerkAuth --- ClerkMetadata
    end

    subgraph APILayer["⚙️ Application & API Tier (Express.js)"]
        ExpressServer["Express 5.x Server (Node.js)"]
        ClerkMW["Clerk Middleware & requireAuth()"]
        CustomAuthMW["Custom Tier & Quota Middleware"]
        MulterMW["Multer (Memory/Disk File Stream)"]
        PDFParser["pdf-parse Engine"]
        AIRouter["/api/ai Router<br/>(Article, Blog, Image, Transform, Resume)"]
        UserRouter["/api/user Router<br/>(Creations, Community, Likes)"]

        ExpressServer --> ClerkMW
        ClerkMW --> CustomAuthMW
        CustomAuthMW --> AIRouter
        CustomAuthMW --> UserRouter
        AIRouter --> MulterMW
        MulterMW --> PDFParser
    end

    subgraph PersistenceLayer["💾 Data & Storage Layer"]
        NeonDB[("Neon Serverless PostgreSQL<br/>(@neondatabase/serverless)")]
        CloudinaryStorage["Cloudinary Media Cloud<br/>(Image CDN & Transformations)"]
    end

    subgraph AIEngineLayer["🧠 Generative AI & Transformation Engines"]
        GeminiAI["Google Gemini 2.0 Flash<br/>(via OpenAI SDK Compatible Client)"]
        ClipDrop["ClipDrop API<br/>(Text-to-Image Synthesis)"]
        CloudinaryAI["Cloudinary AI Engine<br/>(Background Removal & Object Inpainting)"]
    end

    %% Interactions
    ReactApp -- "HTTPS + Bearer JWT" --> ExpressServer
    CustomAuthMW <--> ClerkAuth
    AIRouter --> GeminiAI
    AIRouter --> ClipDrop
    AIRouter --> CloudinaryAI
    AIRouter --> CloudinaryStorage
    AIRouter --> NeonDB
    UserRouter --> NeonDB
    PDFParser --> GeminiAI
```

---

## 🌐 End-to-End Architectural Ecosystem

ZeeAI is designed around a decoupled, service-oriented client-server model:

1. **Presentation Layer**: A responsive Single Page Application (SPA) built with React 19 and Vite 7, styled with Tailwind CSS v4, providing instantaneous feedback and interactive dashboards.
2. **Security & Session Layer**: Clerk manages user identity, session tokens (JWTs), and subscription tier state (`free` vs `premium`), with user metadata keeping track of free quotas.
3. **Backend Orchestrator**: Express 5 on Node.js serves as the API gateway and business logic orchestrator, enforcing authentication, decoding JWTs, asserting subscription rights, and managing payloads.
4. **AI & Media Transformation Engine**:
   - **Google Gemini 2.0 Flash** for fast text reasoning, content generation, and structured resume parsing.
   - **ClipDrop Text-to-Image** for high-resolution image synthesis.
   - **Cloudinary AI Services** for serverless image background extraction and targeted object removal (generative fill/removal).
5. **Persistence Layer**: Serverless PostgreSQL hosted on **Neon DB** using the HTTP/WebSocket `@neondatabase/serverless` driver for pooled database queries.

---

## 🧱 Architecture Tiers & Component Breakdown

### 1. Frontend Tier (Client Layer)
* **Framework**: React 19 (`react`, `react-dom`) + Vite 7 for build tooling and hot-module replacement (HMR).
* **Routing**: React Router DOM v7 (`react-router-dom`), configured with declarative routes:
  * Public Landing Page (`/`): Hero showcase, features grid, pricing tier cards, testimonials, footer.
  * Protected AI Workspace (`/ai`): Master `Layout` containing an interactive collapsible sidebar, header with Clerk user profile button, and nested dynamic sub-routes:
    * `/ai` — Dashboard (Metrics cards & creations history)
    * `/ai/write-article` — AI Article Generator with length controls
    * `/ai/blog-titles` — Catchy Blog Title Generator
    * `/ai/generate-images` — Text-to-Image Generator with public feed publishing option
    * `/ai/remove-background` — Automated image background removal
    * `/ai/remove-object` — Targeted object removal by text query
    * `/ai/review-resume` — Resume PDF uploader and AI evaluator
    * `/ai/community` — Community showcase with likes & download mechanisms
* **Authentication**: `@clerk/clerk-react` wraps the entire app in `ClerkProvider`. Dynamic authorization is handled with `<Protect plan="premium">` and `useAuth().getToken()`.
* **Styling**: Tailwind CSS v4 with modern UI aesthetics, custom glassmorphism gradients, and Lucide React icons.
* **Notifications**: `react-hot-toast` for real-time toast alerts.
* **Content Rendering**: `react-markdown` for rendering structured Markdown generated by AI models.

### 2. Backend Tier (Application & API Layer)
* **Runtime**: Node.js with native ES Modules (`"type": "module"`).
* **Framework**: Express 5.x (`express`).
* **Middleware Stack**:
  * `cors()`: Cross-Origin Resource Sharing for secure communication between frontend and backend.
  * `express.json()`: JSON body parser for incoming payloads.
  * `clerkMiddleware()` & `requireAuth()`: Validates incoming Bearer JWT tokens from Clerk.
  * `auth.js` (Custom Middleware):
    * Verifies `req.auth()` session details.
    * Evaluates user plan (`has({plan: 'premium'})`).
    * Reads and synchronizes `privateMetadata.free_usage` from Clerk Client API.
    * Passes `req.plan` and `req.free_usage` downstream to controller handlers.
  * `multer.js`: Handles multipart/form-data for image and PDF file uploads.
* **Controllers**:
  * `aiController.js`: Handles generation pipelines, prompt engineering, external API orchestration, and DB persistence.
  * `userController.js`: Handles retrieval of private user creations, published public creations, and community like toggling.

### 3. Database & Storage Tier (Persistence Layer)
* **Database**: Neon Serverless PostgreSQL. Connected using `@neondatabase/serverless` over SQL-over-HTTP/WebSockets.
* **Cloud Storage & CDN**: Cloudinary (`cloudinary` v2) stores all generated and transformed image assets, providing permanent secure URLs (`secure_url`) and on-the-fly transformations.
* **File Ingestion**: Temporary storage for file buffer operations before forwarding to Cloudinary or `pdf-parse`.

### 4. AI & External Services Tier (Intelligence Layer)
* **Google Gemini API**: Accessed using the official `openai` Node SDK configured with `baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"` and model `gemini-2.0-flash`.
* **ClipDrop Text-to-Image API**: High-fidelity image generation endpoint (`https://clipdrop-api.co/text-to-image/v1`) consuming prompts and returning binary image data.
* **Cloudinary AI Media Pipeline**:
  * Background Removal: Transformation effect `background_removal: 'remove_the_background'`.
  * Object Removal: Generative transformation effect `gen_remove:${object}`.
* **Resume Parsing Engine**: `pdf-parse` extracts raw text from PDF buffers before passing to Gemini for semantic review.

---

## 🔄 Data Flow & Sequence Workflows

### 1. Text Generation Workflow (Article / Blog Titles)

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant React as React Client
    participant API as Express API (/api/ai/generate-article)
    participant Auth as Clerk Auth Middleware
    participant Gemini as Google Gemini 2.0 Flash
    participant DB as Neon PostgreSQL

    User->>React: Enters prompt & selects word count
    React->>API: POST /api/ai/generate-article (Bearer JWT + Prompt)
    API->>Auth: Validate JWT & check plan / usage quota
    alt Free Plan & Usage >= 10
        Auth-->>React: 403 Limit Exceeded (Upgrade required)
    else Authorized
        Auth->>API: Pass (plan='free'|'premium', free_usage)
        API->>Gemini: chat.completions.create(model: "gemini-2.0-flash")
        Gemini-->>API: Generated Markdown Text
        API->>DB: INSERT INTO creations (user_id, prompt, content, type)
        opt If Plan == 'free'
            API->>Auth: Increment user privateMetadata.free_usage (+1)
        end
        API-->>React: { success: true, content }
        React-->>User: Renders Markdown Output
    end
```

### 2. Image Generation & Media Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant React as React Client
    participant API as Express API (/api/ai/generate-image)
    participant ClipDrop as ClipDrop AI API
    participant Cloudinary as Cloudinary Media Cloud
    participant DB as Neon PostgreSQL

    User->>React: Submits image prompt (Publish toggle: true/false)
    React->>API: POST /api/ai/generate-image (Bearer JWT, prompt, publish)
    API->>API: Assert Premium Plan subscription
    API->>ClipDrop: POST /text-to-image/v1 (Prompt)
    ClipDrop-->>API: ArrayBuffer (Binary Image)
    API->>API: Convert ArrayBuffer to Base64 Data URI
    API->>Cloudinary: uploader.upload(base64Image)
    Cloudinary-->>API: Return secure_url (CDN Image URL)
    API->>DB: INSERT INTO creations (user_id, prompt, content, type='image', publish)
    API-->>React: { success: true, content: secure_url }
    React-->>User: Display Generated Image & Add to Feed
```

### 3. Resume Review Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant React as React Client
    participant API as Express API (/api/ai/resume-review)
    participant Multer as Multer & fs
    participant Parser as pdf-parse Engine
    participant Gemini as Google Gemini 2.0 Flash
    participant DB as Neon PostgreSQL

    User->>React: Uploads Resume (.pdf, < 5MB)
    React->>API: POST /api/ai/resume-review (FormData with PDF)
    API->>Multer: Ingest file & store on disk/temp
    API->>Parser: Extract text buffer from PDF
    Parser-->>API: Extracted raw text content
    API->>Gemini: Prompt with Resume Content for Strengths, Weaknesses, Feedback
    Gemini-->>API: Structured Evaluation Report
    API->>DB: INSERT INTO creations (user_id, prompt, content, type='resume-review')
    API-->>React: { success: true, content }
    React-->>User: Display formatted Resume Feedback
```

### 4. Community & Social Interaction Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant React as React Client
    participant API as Express API (/api/user)
    participant DB as Neon PostgreSQL

    Note over User,DB: Fetching Public Creations
    User->>React: Navigates to /ai/community
    React->>API: GET /api/user/get-published-creations
    API->>DB: SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC
    DB-->>API: Published creations records
    API-->>React: { success: true, creations }
    React-->>User: Render Grid with images, prompts, and like counts

    Note over User,DB: Liking / Unliking Creation
    User->>React: Clicks Heart/Like Icon on Creation
    React->>API: POST /api/user/toggle-like-creation { id: creationId }
    API->>DB: SELECT likes FROM creations WHERE id = creationId
    API->>API: Check if userId in likes array -> Add or Remove
    API->>DB: UPDATE creations SET likes = {updatedLikes}::text[] WHERE id = creationId
    DB-->>API: Success
    API-->>React: { success: true, message: 'Creation Liked'|'Creation Unliked' }
    React-->>User: Optimistically updates UI heart status & count
```

---

## 🗄️ Database Schema & Data Model

ZeeAI uses a single consolidated PostgreSQL table called `creations` managed via Neon Serverless Postgres.

### SQL Table DDL Definition

```sql
CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    publish BOOLEAN DEFAULT FALSE,
    likes TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations (user_id);
CREATE INDEX IF NOT EXISTS idx_creations_publish ON creations (publish);
CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations (created_at DESC);
```

### Column Specifications

| Column Name | Data Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | Auto-increment | Unique identifier for each creation record |
| `user_id` | `TEXT` | `None` (Required) | Clerk User ID associated with the creation owner |
| `prompt` | `TEXT` | `None` (Required) | The input prompt or description used for the generation |
| `content` | `TEXT` | `None` (Required) | Text output, generated Markdown, or Cloudinary asset URL |
| `type` | `TEXT` | `None` (Required) | Category: `'article'`, `'blog-title'`, `'image'`, `'resume-review'` |
| `publish` | `BOOLEAN` | `FALSE` | Flag determining visibility in public Community Feed |
| `likes` | `TEXT[]` | `ARRAY[]::TEXT[]` | PostgreSQL array of Clerk user IDs who liked the creation |
| `created_at` | `TIMESTAMPTZ` | `NOW()` | Timestamp when the creation was generated |

---

## 📂 Complete Project Structure

```
zeeai-saas-platform/
├── README.md                      # Complete system & architectural documentation
├── .gitignore                     # Workspace root gitignore rules
│
├── backend/                       # Node.js & Express API Server
│   ├── .env                       # Backend secrets & API keys (Git-ignored)
│   ├── package.json               # Backend dependencies and runner scripts
│   ├── package-lock.json          # Exact dependency lockfile
│   ├── server.js                  # Express application entrypoint & middleware setup
│   ├── vercel.json                # Vercel serverless deployment routing
│   │
│   ├── configs/                   # Third-party & service configurations
│   │   ├── cloudinary.js          # Cloudinary v2 SDK initializer
│   │   ├── db.js                  # Neon serverless PostgreSQL connection client
│   │   └── multer.js              # Multer file upload storage configuration
│   │
│   ├── controllers/               # Business logic & external AI integrations
│   │   ├── aiController.js        # Handlers for Article, Blog, Image, Transform, Resume
│   │   └── userController.js      # Handlers for User Creations, Community, Likes
│   │
│   ├── middlewares/               # Custom request interceptors
│   │   └── auth.js                # Plan validator & free usage quota tracker
│   │
│   └── routes/                    # API route definitions
│       ├── aiRoutes.js            # Routes mounted at /api/ai
│       └── userRoutes.js          # Routes mounted at /api/user
│
└── frontend/                      # React 19 + Vite Single Page Application
    ├── .env                       # Frontend environment variables (Git-ignored)
    ├── .gitignore                 # Frontend gitignore rules
    ├── index.html                 # HTML shell & font definitions
    ├── package.json               # Frontend dependencies (React, Vite, Tailwind v4, Clerk)
    ├── package-lock.json          # Frontend lockfile
    ├── eslint.config.js           # ESLint configuration
    ├── vite.config.js             # Vite configuration with React & Tailwind plugins
    ├── vercel.json                # Frontend SPA client-side route rewrites
    ├── README.md                  # Frontend quickstart guide
    │
    ├── public/                    # Static public assets
    │   └── favicon.svg            # Browser tab icon
    │
    └── src/                       # Application source code
        ├── main.jsx               # React DOM root render & ClerkProvider setup
        ├── App.jsx                # React Router setup and toast notification container
        ├── index.css              # Global styles & Tailwind CSS v4 directives
        │
        ├── assets/                # Static images, SVG icons, and mock datasets
        │   ├── assets.js          # Asset index, feature catalog, tools list, test data
        │   └── *.png / *.svg      # Brand logos, sample graphics, badges
        │
        ├── components/            # Reusable UI components
        │   ├── AiTools.jsx        # Landing page grid showcasing available AI tools
        │   ├── CreationItem.jsx   # Dashboard creation card with preview, copy & download
        │   ├── Footer.jsx         # Global footer with brand links & newsletter
        │   ├── Hero.jsx           # Landing page hero with dynamic CTA buttons
        │   ├── Navbar.jsx         # Global navigation bar with Auth buttons
        │   ├── Plan.jsx           # Subscription pricing table (Free vs Premium)
        │   ├── Sidebar.jsx        # App workspace sidebar with route navigation
        │   └── Testimonial.jsx    # Social proof & user testimonials slider
        │
        └── pages/                 # Route page views
            ├── Home.jsx           # Public landing page
            ├── Layout.jsx         # App shell (Sidebar + Topbar + Dynamic Outlet)
            ├── Dashboard.jsx      # Metrics overview & user creation history
            ├── WriteArticle.jsx   # AI Article generation view
            ├── BlogTitles.jsx     # AI Blog title generation view
            ├── GenerateImages.jsx # Text-to-image generator with community toggle
            ├── RemoveBackground.jsx# Background extraction tool view
            ├── RemoveObject.jsx   # Generative object removal tool view
            ├── ReviewResume.jsx   # Resume PDF upload and AI review view
            └── Community.jsx      # Public community feed with like & download
```

---

## 📡 API Endpoint Reference

All endpoints (except `GET /`) are protected and require a valid Bearer JWT token in the `Authorization` header: `Authorization: Bearer <clerk_token>`.

### AI Engine Routes (`/api/ai`)

| Method | Endpoint | Access Level | Description | Request Body / Multipart |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/generate-article` | Free (Quota: 10) / Premium | Generates full-length markdown articles | `{ prompt: string, length: number }` |
| `POST` | `/api/ai/generate-blog-title` | Free (Quota: 10) / Premium | Generates catchy blog titles | `{ prompt: string }` |
| `POST` | `/api/ai/generate-image` | **Premium Only** | Synthesizes images using ClipDrop + Cloudinary | `{ prompt: string, publish?: boolean }` |
| `POST` | `/api/ai/remove-image-background` | **Premium Only** | Removes background via Cloudinary AI | Multipart `image: File` |
| `POST` | `/api/ai/remove-image-object` | **Premium Only** | Inpainting object removal via Cloudinary | Multipart `image: File`, Body `object: string` |
| `POST` | `/api/ai/resume-review` | **Premium Only** | Parses resume text and generates critique | Multipart `resume: File (PDF <= 5MB)` |

### User & Social Routes (`/api/user`)

| Method | Endpoint | Access Level | Description | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/user/get-user-creations` | Authenticated | Retrieves creation history for current user | None |
| `GET` | `/api/user/get-published-creations` | Authenticated | Retrieves all publicly published community creations | None |
| `POST` | `/api/user/toggle-like-creation` | Authenticated | Toggles like status for the user on a creation | `{ id: number }` |

---

## 🔒 Authentication, Subscription & Gating Model

```mermaid
flowchart TD
    Req[Incoming Request] --> AuthCheck{Clerk Token Valid?}
    AuthCheck -- No --> Ret401[401 Unauthorized]
    AuthCheck -- Yes --> PlanCheck{Has 'premium' Plan?}

    PlanCheck -- Yes --> Permitted[Grant Access to All Features]

    PlanCheck -- No --> ToolCheck{Is Feature Free-Eligible?}
    ToolCheck -- No (Image/BG/Object/Resume) --> DenyPremium[Deny: Premium Subscription Required]
    ToolCheck -- Yes (Article / Blog Titles) --> QuotaCheck{free_usage < 10?}

    QuotaCheck -- No --> DenyQuota[Deny: Free Limit Exceeded]
    QuotaCheck -- Yes --> ProcessFree[Process Request & Increment free_usage +1]
```

* **Free Tier**: Grants access to text tools (**AI Article Writer**, **Blog Title Generator**) up to **10 free generations**. Quotas are synced directly in the user's Clerk `privateMetadata.free_usage`.
* **Premium Tier**: Grants unlimited access to all tools, including high-compute features:
  * Text-to-Image Generation (ClipDrop + Cloudinary CDN).
  * AI Background Removal.
  * AI Object Removal (Generative Inpainting).
  * AI Resume Reviewer (PDF Parser + Gemini Analysis).
  * Community Showcase Publishing.

---

## 🔑 Environment Variables Matrix

### Backend (`backend/.env`)

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `PORT` | Optional (Default: `3000`) | Port number for the local Express server |
| `DATABASE_URL` | **Yes** | Neon PostgreSQL connection string (`postgresql://user:pass@ep-...neon.tech/neondb?sslmode=require`) |
| `CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk publishable key for JWT verification |
| `CLERK_SECRET_KEY` | **Yes** | Clerk backend secret key for user metadata updates |
| `GEMINI_API_KEY` | **Yes** | Google Gemini API key for `gemini-2.0-flash` inference |
| `CLIPDROP_API_KEY` | **Yes** | ClipDrop API key for AI text-to-image synthesis |
| `CLOUDINARY_CLOUD_NAME` | **Yes** | Cloudinary Cloud identifier |
| `CLOUDINARY_API_KEY` | **Yes** | Cloudinary API access key |
| `CLOUDINARY_API_SECRET` | **Yes** | Cloudinary API secret |

### Frontend (`frontend/.env`)

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `VITE_CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk publishable key for client-side authentication |
| `VITE_BASE_URL` | **Yes** | Base URL of the backend API (e.g. `http://localhost:3000` or production URL) |

---

## 🚢 Deployment & Infrastructure

```mermaid
graph LR
    subgraph VercelFrontend["Vercel (Frontend Project)"]
        SPA["Vercel Edge / CDN<br/>Static Assets + SPA Rewrites (vercel.json)"]
    end

    subgraph VercelBackend["Vercel (Backend Project)"]
        Serverless["Vercel Serverless Function<br/>@vercel/node (server.js)"]
    end

    subgraph ExternalServices["Managed Cloud Services"]
        NeonDB["Neon Serverless Postgres"]
        Cloudinary["Cloudinary CDN"]
        Clerk["Clerk Auth"]
    end

    SPA --> Serverless
    Serverless --> NeonDB
    Serverless --> Cloudinary
    Serverless --> Clerk
```

* **Frontend**: Configured for Vercel with single-page app rewrites via `frontend/vercel.json`.
* **Backend**: Configured for Vercel Serverless Functions via `backend/vercel.json` using the `@vercel/node` builder.

---

## 💻 Local Development Setup

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn
* Neon PostgreSQL account
* Clerk account
* Cloudinary account
* Google Gemini API key & ClipDrop API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "6. ZeeAI SaaS (PERN PROJ)"
```

### 2. Configure Backend
```bash
cd backend
npm install
# Create .env and populate keys as shown in the Environment Variables Matrix
npm run server
```
Backend will start on `http://localhost:3000`.

### 3. Configure Frontend
```bash
cd ../frontend
npm install
# Create .env and set VITE_CLERK_PUBLISHABLE_KEY and VITE_BASE_URL=http://localhost:3000
npm run dev
```
Frontend will start on `http://localhost:5173`.
