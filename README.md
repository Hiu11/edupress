# EduPress – Nền tảng học trực tuyến (HTML / CSS / JS)

## Giới thiệu
**EduPress** là website học trực tuyến mô phỏng hệ thống LMS (*Learning Management System*), được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript thuần**.  
Dự án giúp người dùng **đăng ký – đăng nhập – học khóa học – làm quiz – và quản lý hồ sơ cá nhân**.

---

## Tính năng chính
### Người dùng
- Đăng ký, đăng nhập, quên / đổi mật khẩu  
- Cập nhật hồ sơ cá nhân, đổi avatar  
- Xem tiến trình học tập  

### Học tập
- Danh sách khóa học có tìm kiếm realtime  
- Trang chi tiết khóa học với video, mô tả, tài liệu  
- Upload file, đăng ký xem khóa học  
- Làm bài quiz có đếm thời gian, chấm điểm, lưu lịch sử  

### Tin tức & Liên hệ
- Trang tin tức với bài viết nổi bật  
- Form gửi phản hồi, tích hợp bản đồ Google Maps  

---

## Công nghệ sử dụng
| Thành phần | Công nghệ |
|-------------|------------|
| Frontend | **HTML5**, **CSS3**, **JavaScript (ES6)** |
| Lưu trữ dữ liệu | **LocalStorage (client-side)** |
| UI | Flexbox, Grid, Modal overlay, Responsive layout |
| Icon | [Font Awesome 6](https://fontawesome.com/) |

---

## Cấu trúc thư mục
```
EduPress/
├── html/
│   ├── index.html
│   ├── course-listing.html
│   ├── course-detail.html
│   ├── quiz.html
│   ├── Blogs.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── change-password.html
│   ├── information.html
│   └── profile.html
│
├── css/
│   ├── index.css
│   ├── course-listing.css
│   ├── course-detail.css
│   ├── quiz.css
│   ├── Blogs.css
│   ├── contact.css
│   ├── auth.css
│   ├── login.css
│   ├── forgot-password.css
│   ├── change-password.css
│   ├── information.css
│   └── profile.css
│
├── js/
│   ├── auth.js
│   ├── login.js
│   ├── register.js
│   ├── forgot-password.js
│   ├── change-password.js
│   ├── information.js
│   ├── profile.js
│   ├── course-listing.js
│   ├── course-detail.js
│   ├── quiz.js
│   └── contact.js
│
└── pic/
    ├── logo.png
    ├── banner.png
    └── (các ảnh minh họa khác)
```

---

## Thành viên nhóm

| Thành viên | Vai trò | Phụ trách giao diện | Phụ trách chức năng |
|-------------|----------|--------------------|---------------------|
| **Phan Nguyên Khoa** | Frontend Dev | Đăng nhập, Đăng ký, Hồ sơ cá nhân, Thông tin người dùng, Quên/Đổi mật khẩu | - Xử lý logic đăng nhập/đăng ký<br>- Kiểm tra email trùng<br>- Cập nhật thông tin cá nhân<br>- Đổi mật khẩu, quên mật khẩu<br>- Lưu và cập nhật LocalStorage |
| **Đỗ Trọng Hiếu** | Frontend Dev | Trang chủ, Danh sách khóa học, Chi tiết khóa học, Tin tức, Liên hệ, Quiz | - Tìm kiếm khóa học realtime<br>- Xem chi tiết khóa học, video<br>- Upload tài liệu, làm quiz<br>- Gửi phản hồi liên hệ<br>- Tích hợp Google Map<br>- Modal đăng ký xem khóa học |

---

## Hướng dẫn chạy dự án

### Cách 1 – Mở trực tiếp
1. Giải nén folder EduPress  
2. Mở `html/index.html` bằng trình duyệt  

### Cách 2 – Dùng Live Server (VSCode)
1. Cài extension **Live Server**  
2. Chuột phải vào `index.html` → **Open with Live Server**

---

## Hướng phát triển
- Kết nối Firebase hoặc Node.js Backend  
- Thêm tính năng cho giảng viên và quản trị viên  
- Hệ thống chứng chỉ sau khi hoàn thành khóa học  

---

*EduPress – Học mọi lúc, mọi nơi, dễ dàng và hiệu quả.*

---

## EduPress v2 Architecture

This repository now includes a migration path from the original HTML/CSS/JavaScript LMS demo to a full-stack platform.

### New stack

| Layer | Technology |
| --- | --- |
| Frontend | Vue 3, Vite |
| Backend | FastAPI, Python |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| API style | REST |

### New folders

```txt
client/   Vue 3 application
server/   FastAPI application
html/     Legacy static pages
css/      Legacy static styles
js/       Legacy static scripts
pic/      Shared image assets
```

### Run the Vue client

```powershell
cd client
npm install
npm run dev
```

### Run the FastAPI server

```powershell
cd server
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

Create a PostgreSQL database named `edupress` before starting the API, or edit `DATABASE_URL` in `server/.env`.
