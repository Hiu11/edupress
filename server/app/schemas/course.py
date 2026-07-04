from pydantic import BaseModel, ConfigDict


class CourseBase(BaseModel):
    title: str
    author: str
    category: str
    description: str
    image_url: str | None = None


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
