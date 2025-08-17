# TalkNest 🗣️ - MERN Stack Forum Web App

**Live Site** 🌐: [https://b11-a12-talk-nest.netlify.app/](https://b11-a12-talk-nest.netlify.app/)  

---

## 📌 Project Overview

**TalkNest** is a dynamic online forum where users can create, vote, and comment on posts using tags. The platform supports user authentication, role-based access, membership, announcements, reporting system, and admin functionalities.

---

## 🎯 Main Features

### 🏠 Home Page
- Navbar with user avatar or login option.
- Banner section with search bar.
- Tag-based post filtering.
- Sort by **Latest** or **Popularity (upVote - downVote)**.
- Pagination (5 posts per page).
- Announcements section (conditionally rendered).

### 🧑‍💻 Authentication (Join Us Page)
- Firebase Authentication (Email/Password + Google)
- React Hook Form validation
- Role-based badges:
  - 🥉 Bronze (for all users)
  - 🥇 Gold (for paid members)

### 🧑‍🎓 User Dashboard
- **My Profile**: Name, Email, Badge, 3 recent posts.
- **Add Post**: Limited to 5 for non-members. Gold members can post unlimited.
- **My Posts**: See own posts, comment count, vote count, delete option.
- **Report Comments**: Feedback system and report logic with modal.

### 🛡️ Admin Dashboard
- **Admin Profile**: Total posts, comments, users with Pie Chart.
- **Manage Users**: Promote to admin, search by name, pagination.
- **Make Announcement**: Post system-wide notices.
- **Reported Comments**: See all reports, give warning, delete comment.

### 💳 Membership Page
- Stripe integration for $20 payment.
- Upon payment, user becomes Gold member.

### 💬 Post Details Page
- Upvote/Downvote once per user.
- Social Share (Facebook, WhatsApp, LinkedIn).
- Comment system with authentication.
- Comment reporting with feedback dropdown.

---

## 🚀 Technologies Used

### 🖥️ Frontend
- React.js
- React Router DOM
- TanStack Query
- Firebase Auth
- React Hook Form
- React Select
- React Icons
- React Share
- Axios
- Tailwind CSS
- DaisyUI

### 🌐 Backend
- Node.js
- Express.js
- MongoDB (no mongoose)
- Stripe Payment API
- JWT (manual implementation, via Firebase login)
- CORS
- dotenv

---

## 🔐 Protected Routes & Middleware

- JWT token-based route protection using custom middleware.
- Admin-only route protection (`verifyAdmin` middleware).
- Stripe client secret handled server-side.
- No session used (JWT stored in localStorage/cookies).

---

## 🧪 Extra Functionalities

- Warning system to users reported by others.
- Vote once logic with vote list (`votes: [{ email, type }]`).
- Comments modal (if length > 20).
- Custom toast feedback via `react-toastify`.

---

## 🛠️ Folder Structure Highlights

