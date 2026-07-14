from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CaptionLine(BaseModel):
    time: int
    text: str

curated_transcripts = {
    "aircAruvnKk": [
        { "time": 0,   "text": "Giới thiệu: Mạng nơ-ron là gì?" },
        { "time": 15,  "text": "Mỗi lớp nơ-ron học một tính năng khác nhau của dữ liệu." },
        { "time": 40,  "text": "Hàm kích hoạt (activation function) quyết định nơ-ron có 'bật' không." },
        { "time": 70,  "text": "Backpropagation: lan truyền ngược để điều chỉnh trọng số." },
        { "time": 100, "text": "Gradient descent: thuật toán tối ưu hóa trọng số theo từng bước." },
        { "time": 130, "text": "Ví dụ thực tế: nhận diện chữ viết tay với MNIST dataset." },
    ],
    "pTB0EiLXUC8": [
        { "time": 0,   "text": "OOP giải quyết vấn đề gì trong lập trình truyền thống?" },
        { "time": 20,  "text": "4 Pillars: Encapsulation — gói dữ liệu vào trong class." },
        { "time": 50,  "text": "Abstraction — ẩn chi tiết, chỉ lộ ra interface cần thiết." },
        { "time": 90,  "text": "Inheritance — class con kế thừa tính năng của class cha." },
        { "time": 130, "text": "Polymorphism — cùng phương thức, hành vi khác nhau theo object." },
        { "time": 170, "text": "Demo: xây class Animal → Dog, Cat với override method speak()." },
    ],
    "ysEN5RaKOlA": [
        { "time": 0,   "text": "HTML5 — cấu trúc trang với semantic elements." },
        { "time": 25,  "text": "CSS Flexbox và Grid — bố cục responsive hiện đại." },
        { "time": 55,  "text": "JavaScript ES6+: arrow functions, destructuring, async/await." },
        { "time": 90,  "text": "React/Vue component model — tái sử dụng UI." },
        { "time": 130, "text": "REST API — giao tiếp giữa client và server." },
        { "time": 170, "text": "Deploy: Vercel, Netlify — CI/CD tự động khi push code." },
    ]
}

default_transcript = [
    { "time": 0,   "text": "Bắt đầu bài học — hãy chuẩn bị ghi chú!" },
    { "time": 20,  "text": "Khái niệm nền tảng và ứng dụng thực tế." },
    { "time": 50,  "text": "Ví dụ minh họa từng bước." },
    { "time": 80,  "text": "Bài tập thực hành cuối module." },
]

@router.get("/captions/{video_id}", response_model=List[CaptionLine])
async def get_captions(video_id: str):
    captions = curated_transcripts.get(video_id, default_transcript)
    return captions

